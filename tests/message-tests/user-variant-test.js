var BaseTest = require('../base');

// set the alternate variant of the message fixture and verify that scenario
module.exports = new BaseTest({
  'tags': ["universe"],
  'test with variant one': function (client) {
    client.setMockVariant({fixture: '/api/users/get', variant: 'one'})
      .url(this.appUrl('/users'))
      .assert.containsText(".ant-table-row", 'Single User Name');
  }
});
