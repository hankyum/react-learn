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
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  it('check rest API setMockID exists and id can be set', function (done) {
    server
      .get('/api/testHeaders')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
        Expect(res.headers.header1).to.equal('test1');
        Expect(res.headers.header2).to.equal('test2');
        Expect(res.headers.header3).to.equal('true');
        Expect(res.body.test).to.equal('I am header test');
        done();
      });
  });
});
