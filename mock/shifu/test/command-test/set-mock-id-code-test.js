var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

var server = Supertest.agent('http://dev.walmart.com:3000');

describe('set-mock-id-test', function () {

  before(function () {
    ShifuServer.start({mockedDirectory: './test/resources/mocked-data'});
    shifu.setMockId('set-mock-id');
  });

  after(function () {
    shifu.resetMockId();
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  it('data should be returned from file 1 with code', function (done) {
    server
      .get('/api/setMockIdCode')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal(1);
        Expect(res.status).to.equal(201);
        done();
      });
  });

  it('data should be returned from file 2 with code', function (done) {
    server
      .get('/api/setMockIdCode')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal(2);
        Expect(res.status).to.equal(202);
        done();
      });
  });

  it('data should be returned from file 3 with code', function (done) {
    server
      .get('/api/setMockIdCode')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal(3);
        Expect(res.status).to.equal(203);
        done();
      });
  });

  it('data should be returned from default file with code', function (done) {
    server
      .get('/api/setMockIdCode')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal('Default file');
        Expect(res.status).to.equal(300);
        done();
      });
  });
});
