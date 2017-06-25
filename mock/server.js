// load mocked endpoint

var host = process.env.HOST || "localhost";

require('./endpoints');
require('shifu').start({
  host: host,
  mockedDirectory: "./mock/",
  port: 8001
});
