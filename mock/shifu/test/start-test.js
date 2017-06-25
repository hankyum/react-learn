var Assert = require('chai').assert;
var ShifuServer = require('./resources/run-mock-server-api-dynamic.js');

describe('start-test', function () {

  before(function () {
    ShifuServer.start({
      port: 8010,
      host: 'localhost'
    });
  });

  after(function () {
    ShifuServer.stop();
  });

  it('should start server with custom settings', function (done) {
    if (ShifuServer.info() !== null) {
      Assert.equal(ShifuServer.info().port, '8010');
      Assert.equal(ShifuServer.info().host, 'localhost');
      done();
    } else {
      console.log('server not started - skipping test');
      done();
    }
  });
});
