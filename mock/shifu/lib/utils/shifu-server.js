var Utils = require('./common-utils');

module.exports = {
  setMockId: {
    id: 'Shifu-SetMockId',
    label: 'Shifu - Set Mock Id',
    path: '/_admin/api/shifu/setMockId/{mockid}',
    handler: function (req, reply) {
      var mockid = req.params.mockid;
      Utils.setMockId(mockid);
      var currentMockId = Utils.getMockId();
      reply({'mockId': currentMockId}).code(200);
    }
  },

  getMockId: {
    id: 'Shifu-GetMockId',
    label: 'Shifu - Get Mock Id',
    path: '/_admin/api/shifu/getMockId',
    handler: function (req, reply) {
      var currentMockId = getMockId();
      reply({'mockId': currentMockId}).code(200);
    }
  },

  resetMockId: {
    id: 'Shifu-ResetMockId',
    label: 'Shifu - Reset Mock Id',
    path: '/_admin/api/shifu/resetMockId',
    handler: function (req, reply) {
      Utils.resetMockId();
      var currentMockId = getMockId();
      reply({'mockId': currentMockId}).code(200);
    }
  },

  resetURLCount: {
    id: 'Shifu-ResetURLCount',
    label: 'Shifu - Reset URL Count',
    path: '/_admin/api/shifu/resetURLCount',
    handler: function (req, reply) {
      Utils.resetURLCount();
      var urlCounts = Utils.getURLCount();
      if (Object.keys(urlCounts).length === 0) {
        urlCounts = {'count': 'NOT_SET'};
      }
      reply(urlCounts).code(200);
    }
  },

  getURLCount: {
    id: 'Shifu-GetURLCount',
    label: 'Shifu - Get URL Count',
    path: '/_admin/api/shifu/getURLCount',
    handler: function (req, reply) {
      var urlCounts = Utils.getURLCount();
      if (urlCounts === undefined) {
        urlCounts = {'count': 'NOT_SET'};
      }
      reply(urlCounts).code(200);
    }
  }
};

function getMockId() {
  var currentMockId = Utils.getMockId();
  if (currentMockId === undefined) {
    currentMockId = 'NOT_SET';
  }
  return currentMockId;
}
