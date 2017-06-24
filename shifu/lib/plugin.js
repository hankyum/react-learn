/********
 Always initiate the static file handler to enable respondWithFile.
 *********/
var Path = require('path');
var SmocksHapi = require('smocks/hapi');
var ShifuUtils = require('./utils/common-utils');

module.exports = function (hapiPluginOptions, smocksOptions) {

  console.log('PLUGIN');

  var smocksOptions = smocksOptions || {};
  // Normally the plugin/magellan is started from the automation directory.
  var mockDir = smocksOptions.mockedDirectory || './mocked-data';

  // Shifus own plugin
  var fileHandler = require('./utils/static-file-handler')(Path.join(process.cwd(), mockDir));
  var respondWithFilePlugin = fileHandler;
  ShifuUtils.initFileHandler(fileHandler);

  console.log('Creating shifu plugin');

  if (hapiPluginOptions && smocksOptions) {
    smocksOptions.respondWithFileHandler = respondWithFilePlugin;
    return SmocksHapi.toPlugin(hapiPluginOptions, smocksOptions);
  } else {
    // By default always initialize Shifu plugins
    smocksOptions.respondWithFileHandler = respondWithFilePlugin;
    return SmocksHapi.toPlugin(undefined, smocksOptions);
  }
};

