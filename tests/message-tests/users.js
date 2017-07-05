var BaseTest = require('../base');

module.exports = new BaseTest({
  'tags': ["users"],
  'test users page': function (client) {
    client.url(this.appUrl('/users'))
      .assert.elementPresent(".ant-table-row");
  }
});
