var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

var server = Supertest.agent('http://dev.walmart.com:3000');

describe('reply-image-test', function () {

  before(function () {
    ShifuServer.start({mockedDirectory: './test/resources/mocked-data'});
    shifu.setMockId('images');
  });

  after(function () {
    shifu.resetMockId();
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  afterEach(function () {
    shifu.resetMockId();
  });

  it('image file should be returned with setMockId api', function (done) {
    server
      .get('/api/testImage')
      .expect('Content-type',/image\/jpeg/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.type).to.equal('image/jpeg');
        done();
      });
  });

  it('image file should be returned with respondWithFile using variant', function (done) {
    server
      .post('/_admin/api/route/images')
      .send({ variant: 'image-respondWithFile' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/api/testImage')
          .expect('Content-type',/image\/jpeg/)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.type).to.equal('image/jpeg');
            done();
          });
      });
  });

  it('image file should be returned with respondWithFile using filepath', function (done) {
    server
      .post('/_admin/api/route/images')
      .send({ variant: 'image-filepath' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/api/testImage')
          .expect('Content-type',/image\/jpeg/)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.type).to.equal('image/jpeg');
            done();
          });
      });
  });

});
