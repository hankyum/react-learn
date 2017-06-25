// load mocked endpoint
require('./endpoints');
var shifu = require('../../index');
shifu.start({
  host: 'dev.walmart.com',
  mockedDirectory: './test/resources/mocked-data',
  port: 8080
});
