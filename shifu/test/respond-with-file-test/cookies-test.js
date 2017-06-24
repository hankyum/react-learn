var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

var server = Supertest.agent('http://dev.walmart.com:3000');

describe('shifu-server-test', function () {

  before(function () {
    ShifuServer.start({mockedDirectory: './test/resources/mocked-data'});
  });

  after(function () {
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  it('check cookies are set', function (done) {
    server
      .get('/api/testCookies')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
        var cookies = res.headers['set-cookie'];
        Expect(cookies.length).to.equal(3);
        Expect(cookies[0]).to.equal('com.wm.customer=vz7.0b5c56');
        Expect(cookies[1]).to.equal('CID=SmockedCID; Domain=domain; Path=/');
        Expect(cookies[2]).to.equal('anotherCookie=cookieValue');
        done();
      });
  });

  it('check no cookies are set', function (done) {
    server
      .get('/api/testHeaders')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
        var cookies = res.headers['set-cookie'];
        Expect(cookies).to.equal(undefined);
        done();
      });
  });

});
