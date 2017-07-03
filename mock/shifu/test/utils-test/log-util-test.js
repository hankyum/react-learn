var config = require('../../lib/resources/config.json');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

describe('log-level-default-value', function () {
  it('default log level should be set to warn', function (done) {
    var logLevel = config.logLevel;
    Expect(logLevel).to.equal('WARN');
    done();
  });

  it('user should be able to modify log level', function (done) {
    shifu.log.setLogLevel('ERROR');
    var level = shifu.log.getLogLevel();
    Expect(level).to.equal(1);
    done();
  });

  it('User should be able to reset log level to default', function (done) {
    shifu.log.setLogLevel('ERROR');
    shifu.log.resetLogLevel();
    var level = shifu.log.getLogLevel();
    Expect(level).to.equal(2);
    done();
  });
});
