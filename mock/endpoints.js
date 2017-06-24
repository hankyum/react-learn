const server = require('smocks')('example'); // we always have to set a mock server id
const shiFu = require('shifu');
const fs = require('fs');
const path = require('path');
const METHODS = ["GET", "POST", "PUT", "DELETE"];

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
      shiFu.util.respondWithFile(this, removeImagesFromReply(reply), { code: 200 });
    },
    config: {
      cors: corsHeaders
    }
  });
  fs.readdirSync(path.join(__dirname, folder, method))
    .filter(isJsonFile)
    .map((name) => name.split(".")[0])
    .filter(name => name !== 'default')
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

// fixture demonstrating user config, handling state and multiple constiants
server.route({
  id: 'counter',
  label: 'Counter and Message', // label is optional
  path: '/api/counter',
  method: 'GET', // method is optional if it is GET
  websocketId: 'countUp', // websocketId is optional will default to path option

  input: {
    countBy: {
      label: 'Count by',
      type: 'text',
      defaultValue: '1'
    },
    countBy2: {
      label: 'Count by2',
      type: 'text',
      defaultValue: '2'
    },
    countBy3: {
      label: 'Count by3',
      type: 'text',
      defaultValue: '3'
    }
  },

  handler: function (req, reply, _server) {
    _server.publish('/test/subscription', { message: 'From subscription', count: this.state('counter') || 0 });

    // routes can have a default handler but do not have to
    respond.call(this, 'default message', reply);
  }
})
// add a separate handler for this fixture
  .variant({
    id: 'hello_world',
    label: 'hello world',
    handler: function (req, reply) {
      respond.call(this, 'hello world', reply);
    }
  })
  // and we can have as many constiants as we want
  .variant({
    id: 'hello_universe',
    label: 'hello universe',
    handler: function (req, reply) {
      respond.call(this, 'hello universe', reply);
    }
  });

function respond(message, reply) {
  // context is "this" from the route handler

  // this is how you get the user config value
  let countBy = this.input('countBy');
  countBy = parseInt(countBy, 10) || 1;

  // this is how you get state values
  let count = this.state('counter') || 0;
  count = count + countBy;

  // this is how you set a state value
  this.state('counter', count);

  reply({
    message: message,
    count: count
  });
}

server.subscription('/test/subscription');

server.onWebsocketConnection(function (server, socket) {
  console.log('got a connection!!');
});

server.onWebsocketDisconnection(function (server, socket) {
  console.log('got a disconnection :(');
});

server.onWebsocketMessage(function (server, socket, message, reply) {
  console.log('got a message!', message);
  reply('Got : ' + JSON.stringify(message));
});

// now start the server
// server.start({
//   port: 8000,
//   host: 'localhost'
// }, {}, function (err) {
//   if (err) {
//     console.log('smocks server not started\n', err);
//     process.exit(1);
//   }
// });

