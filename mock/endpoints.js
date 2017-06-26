const shiFu = require('shifu');
const fs = require('fs');
const path = require('path');
const METHODS = ["GET", "POST", "PUT", "DELETE"];
const DEFAULT_RESPONSE_FILE = 'default';

shiFu.id("mock-example");

const corsHeaders = {
  origin: ['*'],
  headers: [
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type",
    "x-csrf-jwt"
  ],
  credentials: true
};
const removeImagesFromReply = (reply) => {
  return (data) => {
    // if (process.env.HOST && process.env.HOST.indexOf("dev.xx.com") === -1) {
    //   return reply(data.replace(/https:\/\/i5.xxx.com/g, ""));
    // } else {
    //   return reply(data);
    // }
    return reply(data);
  };
};

const isJsonFile = (name) => name.indexOf(".json") > 0;

const generateVariantsFromFolder = (folder) => {
  folder = folder.replace(/[{}]/g, '');
  const pathName = path.join(__dirname, folder);
  const dirs = fs.readdirSync(pathName);
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
  const route = shiFu.route({
    id,
    label: folder,
    path: folder,
    method: method,
    handler: function (req, reply) {
      console.log("--- mock request payload -- ", req.payload);
      shiFu.util.respondWithFile(this,
        removeImagesFromReply(reply),
        {transpose: req.payload, code: 200 }
      );
    },
    config: {
      cors: corsHeaders
    }
  });

  fs.readdirSync(path.join(__dirname, folder, method))
    .filter(isJsonFile)
    .map((name) => name.split(".")[0])
    .filter(name => name !== DEFAULT_RESPONSE_FILE)
    .forEach((name) => {
      route.variant({
        id: name,
        label: name,
        handler: function (req, reply) {
          shiFu.util.respondWithFile(this, removeImagesFromReply(reply), { code: parseInt(name) || 200 });
        }
      });
    });
  return route;
};

generateVariantsFromFolder("/api/");

