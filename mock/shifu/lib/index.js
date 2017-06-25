var Start = require('./start');
var Plugin = require('./plugin');
var Utils = require('./utils/common-utils');
var Smocks = require('smocks');
var LogUtils = require('./utils/log-utils');
var ShifuServer = require('./utils/shifu-server');
var shifuServerStarted = false;

var shifuInstance = module.exports = {

  id: function (id) {
    if (!id) {
      return Smocks._id;
    }
    Smocks._id = id;
    return Smocks;
  },

  start: function (shifuOptions) {
    LogUtils.debug('Started.....');
    if (shifuServerStarted === false) {
      for (var i in ShifuServer) {
        if (ShifuServer.hasOwnProperty(i)) {
          this.route(ShifuServer[i]);
        }
      }
      shifuServerStarted = true;
    }

    return Start(shifuOptions);
  },

  toPlugin: function (hapiPluginOptions, smocksOptions) {
    return Plugin(hapiPluginOptions, smocksOptions);
  },

  route: function (data) {
    LogUtils.debug('Routes.....');
    LogUtils.debug(JSON.stringify(data, null, 2));
    return Smocks.route(data);
  },

  setMockId: function (mockId) {
    Utils.setMockId(mockId);
  },

  getMockId: function (mockId) {
    Utils.getMockId(mockId);
  },

  resetMockId: function () {
    Utils.resetMockId();
  },

  resetURLCount: function () {
    Utils.resetURLCount();
  },

  getURLCount: function () {
    Utils.getURLCount();
  },

  util: Utils,
  log: LogUtils

};

module.exports = shifuInstance;
