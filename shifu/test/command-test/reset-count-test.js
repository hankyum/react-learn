var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

var server = Supertest.agent('http://dev.walmart.com:3000');

describe('reset-count-test', function () {

  before(function () {
    ShifuServer.start({mockedDirectory: './test/resources/mocked-data'});
    shifu.setMockId('set-mock-id');
  });

  after(function () {
    shifu.resetMockId();
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  it('Instance 1: should return data from file 1 for two calls on resetting count after 1', function (done) {
    server
      .get('/api/setMockId1')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal(1);
        shifu.resetURLCount();

        server
          .get('/api/setMockId1')
          .expect('Content-type',/json/)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.body.test).to.equal(1);
            done();
          });
      });
  });
});
