var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

var server = Supertest.agent('http://dev.walmart.com:3000');

describe('reset-count-test', function () {

  before(function () {
    ShifuServer.start({mockedDirectory: './test/resources/mocked-data'});
  });

  after(function () {
    shifu.resetMockId();
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  it('check that first call returns right count', function (done) {
    server
      .get('/message')
      .expect('Content-type',/json/)
      .end(function (err) {
        Expect(err).to.equal(null);
        server
          .get('/_admin/api/shifu/getURLCount')
          .expect('Content-type',/json/)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.status).to.equal(200);
            Expect(res.body['message-GET']).to.equal(1);
            done();
          });
      });
  });
});
