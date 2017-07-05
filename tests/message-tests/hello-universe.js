var BaseTest = require('../base');

// set the alternate variant of the message fixture and verify that scenario
module.exports = new BaseTest({
  'tags': ["universe"],
  'test with variant': function (client) {
    // here we are using a mock server RESTful call to change the
    // variant that the message fixture should be returning (to "hello universe")
    // the fixture definition with these ids live in ../../mocks/endpoints.js
    client.setMockVariant({fixture: '/api/users/get', variant: 'empty'})
      .url(this.appUrl('/'))
      .assert.elContainsText('body h1', 'React Router App Demos With Server Side Rendering');
  }
});
