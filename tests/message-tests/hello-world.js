var BaseTest = require('../base');

module.exports = new BaseTest({
  'tags': ["hello"],
  'hello test': function (client) {
    client.url(this.appUrl('/'))
      .assert.containsText('body h1', 'React Router App Demos With Server Side Rendering');
  }
});
