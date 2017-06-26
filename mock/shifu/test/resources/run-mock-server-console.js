// load mocked endpoint
require('./endpoints');
var shifu = require('../../index');
shifu.start({
  host: 'localhost',
  mockedDirectory: './test/resources/mocked-data',
  port: 8080
});
