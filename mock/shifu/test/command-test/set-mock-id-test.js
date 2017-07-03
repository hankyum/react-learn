var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

var server = Supertest.agent('http://localhost:3000');

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

  it('data should be returned from the folder "set-mock-id" for api setMockId1', function (done) {
    server
      .get('/api/setMockId1')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal(1);
        Expect(res.status).to.equal(201);
        done();
      });
  });

  it('data should be returned from the folder "set-mock-id" for api setMockId', function (done) {
    server
      .get('/api/setMockId')
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.text).to.equal('I am txt and should be returned for first call only.');
        done();
      });
  });

  it('data should be returned for url with dashes', function (done) {
    server
      .get('/api/checkout-customer/1234/shipping-address')
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.test).to.equal('url with  Dash response file');
        done();
      });
  });
});
