// load mocked endpoint
require('./endpoints');

var shifu = require('../../index');

module.exports = {

  start: function () {
    server = shifu.start({
      port: 3000,
      host: 'localhost',
      mockedDirectory: './test/resources/mocked-data'
    }).server;
  },

  stop: function () {
    server.stop(function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
};
