// exporting the smocks capabilities as a hapi plugin

// load our example endpoint
require('./smocks');

var plugin = require('smocks/hapi').toPlugin();
plugin.attributes = {
  pkg: require('../package.json')
};
module.exports = plugin;
