var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');

// This agent refers to PORTgit  where program is runninng.
var server = Supertest.agent('http://localhost:3000');

describe('respond-file-extension-test', function () {

  before(function () {
    ShifuServer.start();
  });

  after(function () {
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  it('should return json file type - Util Method',function (done) {
    server
      .get('/extension')
      .expect('Content-type',/json/)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.body.fileType).to.equal('json');
        done();
      });
  });

  it('should return html file - Util Method',function (done) {
    // setMockVariant on the server
    server
      .post('/_admin/api/route/file-extension')
      .send({ variant: 'HTML' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/extension')
          .expect('Content-type',/html/)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.text).to.equal('I am html');
            done();
          });
      });
  });

  it('should return txt file - Util Method',function (done) {
    // setMockVariant on the server
    server
      .post('/_admin/api/route/file-extension')
      .send({ variant: 'TXT' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/extension')
          .expect('Content-type',/text\/plain/)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.text).to.equal('I am text');
            done();
          });
      });
  });

  it('should return unknown extension file - Util Method',function (done) {
    // setMockVariant on the server
    server
      .post('/_admin/api/route/file-extension')
      .send({ variant: 'Unknown' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/extension')
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.text).to.equal('I am unknown');
            done();
          });
      });
  });

  it('should return json file type - respondWithFile Method',function (done) {
    server
      .post('/_admin/api/route/file-extension')
      .send({ variant: 'json-respondWithFile' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/extension')
          .expect('Content-type',/json/)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.body.fileType).to.equal('json');
            done();
          });
      });
  });

  it('should return html file - respondWithFile Method',function (done) {
    // setMockVariant on the server
    server
      .post('/_admin/api/route/file-extension')
      .send({ variant: 'HTML-respondWithFile' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/extension')
          .expect('Content-type',/html/)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.text).to.equal('I am html');
            done();
          });
      });
  });

  it('should return txt file - respondWithFile Method',function (done) {
    // setMockVariant on the server
    server
      .post('/_admin/api/route/file-extension')
      .send({ variant: 'TXT-respondWithFile' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/extension')
          .expect('Content-type',/text\/plain/)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.text).to.equal('I am text');
            done();
          });
      });
  });

  it('should return unknown extension file - respondWithFile Method',function (done) {
    // setMockVariant on the server
    server
      .post('/_admin/api/route/file-extension')
      .send({ variant: 'Unknown-respondWithFile' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/extension')
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.text).to.equal('I am unknown');
            done();
          });
      });
  });

});
