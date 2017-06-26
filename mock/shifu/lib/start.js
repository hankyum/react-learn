/********
 Always initiate the static file handler to enable respondWithFile.
 *********/
var Path = require('path');
var SmocksHapi = require('smocks/hapi');
var ShifuUtils = require('./utils/common-utils');

module.exports = function (shifuOptions) {
  var shifuOptions = shifuOptions || {};

  var port = shifuOptions.port || 8000;
  var host = shifuOptions.host || 'localhost';
  var hapiOptions = {port: port, host: host};
  var mockDir = shifuOptions.mockedDirectory || '../mocked-data';

  console.log('Starting shifu server on ' + host + ':' + port);

  var fileHandler = require('./utils/static-file-handler')(Path.join(process.cwd(), mockDir));
  shifuOptions.respondWithFileHandler = fileHandler;
  ShifuUtils.initFileHandler(fileHandler);

  return SmocksHapi.start(hapiOptions, shifuOptions);
};
