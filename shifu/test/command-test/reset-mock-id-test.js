var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

var server = Supertest.agent('http://dev.walmart.com:3000');

describe('reset-mock-id-test', function () {

  before(function () {
    ShifuServer.start({mockedDirectory: './test/resources/mocked-data'});
    shifu.setMockId('set-mock-id');
  });

  after(function () {
    shifu.resetMockId();
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  it('data should be returned from variant after resetting mock id', function (done) {
    server
      .get('/api/setMockId1')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal(1);
        shifu.resetMockId();
        shifu.resetURLCount();
        server
          .get('/api/setMockId1')
          .expect('Content-type',/json/)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.body.test).to.equal('I am original and not from folder');
            done();
          });
      });
  });
});
