var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

var server = Supertest.agent('http://dev.walmart.com:3000');

describe('response-based-on-count-test', function () {

  before(function () {
    ShifuServer.start({mockedDirectory: './test/resources/mocked-data'});
    shifu.setMockId('set-mock-id');
  });

  after(function () {
    shifu.resetMockId();
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  it('Instance 1: should return data from file 1', function (done) {
    server
      .get('/api/setMockId1')
      .expect('Content-type', /json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal(1);
        done();
      });
  });

  it('Instance 2: should return data from file 2', function (done) {
    server
      .get('/api/setMockId1')
      .expect('Content-type', /json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal(2);
        done();
      });
  });

  it('Instance 3: should return data from file 3', function (done) {
    server
      .get('/api/setMockId1')
      .expect('Content-type', /json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal(3);
        done();
      });
  });

  it('Instance 4: should return data from default file as file four does not exists', function (done) {
    server
      .get('/api/setMockId1')
      .expect('Content-type', /json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal('Default file');
        done();
      });
  });

  it('Instance 5: should return data from default file as file five does not exists', function (done) {
    server
      .get('/api/setMockId1')
      .expect('Content-type', /json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal('Default file');
        done();
      });
  });

  it('Instance 6: should return data from file 6', function (done) {
    server
      .get('/api/setMockId1')
      .expect('Content-type', /json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal(6);
        done();
      });
  });

});
