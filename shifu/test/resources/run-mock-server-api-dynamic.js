// load mocked endpoint
require('./endpoints');

var shifu = require('../../index');

module.exports = {

  start: function (options) {
    server = shifu.start(options).server;
  },

  stop: function () {
    server.stop(function (err) {
      if (err) {
        console.log(err);
      }
    });
  },

  info: function () {
    return server.info;
  }
};

