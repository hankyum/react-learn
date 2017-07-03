const server = require('smocks')('smock-example'); // we always have to set a mock server id
const fs = require('fs');
const path = require('path');
const METHODS = ["GET", "POST", "PUT", "DELETE"];
const DEFAULT_RESPONSE_FILE = 'default.json';

const corsHeaders = {
  origin: ['*'],
  headers: [
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type",
    "x-csrf-jwt"
  ],
  credentials: true
};

const isJsonFile = (name) => name.indexOf(".json") > 0;
const varinatName = (name) => name.split(".")[0];

const generateVariantsFromFolder = (folder) => {
  const dirs = fs.readdirSync(path.join(__dirname, folder));
  const methods = dirs.filter((file) => METHODS.includes(file));
  const nextDirs = dirs.filter((file) => !METHODS.includes(file) && !isJsonFile(file));
  if (methods.length > 0) {
    methods.forEach((routeMethod) => {
      shiFuRoute(folder, '', routeMethod);
    });
  }
  if (nextDirs.length > 0) {
    nextDirs.forEach((nextDir) => generateVariantsFromFolder(path.join(folder, nextDir)));
  }
};

const shiFuRoute = (folder, name, method = "GET") => {
  const id = `${folder}/${method}`.toLowerCase();
  const route = server.route({
    id,
    label: folder,
    path: folder,
    method: method,
    config: {
      cors: corsHeaders
    }
  }).respondWithFile(`./${folder}/${method}/${DEFAULT_RESPONSE_FILE}`);

  fs.readdirSync(path.join(__dirname, folder, method))
    .filter(isJsonFile)
    .filter(name => name !== DEFAULT_RESPONSE_FILE)
    .forEach((name) => {
      route.variant(varinatName(name)).respondWithFile({
        code: parseInt(varinatName(name)) || 200,
        path: `./${folder}/${method}/${name}`
      });
    });
  return route;
};

generateVariantsFromFolder("/api/");


// now start the server
server.start({
  port: 8000,
  host: 'localhost'
}, {
}, function (err) {
  if (err) {
    console.log('smocks server not started\n', err);
    process.exit(1);
  }
});