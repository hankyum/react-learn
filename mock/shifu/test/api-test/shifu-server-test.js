var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

var server = Supertest.agent('http://localhost:3000');

describe('shifu-server-test', function () {

  before(function () {
    ShifuServer.start({mockedDirectory: './test/resources/mocked-data'});
  });

  after(function () {
    shifu.resetMockId();
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  it('check rest API setMockID exists and id can be set', function (done) {
    server
      .get('/_admin/api/shifu/setMockId/id1')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
        Expect(res.body.mockId).to.equal('id1');
        done();
      });
  });

  it('check rest API resetMockID exists and id can be reset to none', function (done) {
    server
      .get('/_admin/api/shifu/resetMockId')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
        Expect(res.body.mockId).to.equal('NOT_SET');
        done();
      });
  });

  it('check rest API getMockID exists', function (done) {
    server
      .get('/_admin/api/shifu/getMockId')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
        Expect(res.body.mockId).to.equal('NOT_SET');
        done();
      });
  });

  it('check rest API getURLCount exists', function (done) {
    server
      .get('/_admin/api/shifu/getURLCount')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
        Expect(res.body.count).to.equal('NOT_SET');
        done();
      });
  });

  it('check rest API resetURLCount exists', function (done) {
    server
      .get('/_admin/api/shifu/resetURLCount')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
        Expect(res.body.count).to.equal('NOT_SET');
        done();
      });
  });

});
