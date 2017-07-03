var Supertest = require('supertest');
var ShifuServer = require('./../resources/run-mock-server-api.js');
var Expect = require('chai').expect;
var shifu = require('../../lib/index');
var server = Supertest.agent('http://localhost:3000');

describe('respond-with-file-test', function () {

  before(function () {
    ShifuServer.start();
  });

  after(function () {
    shifu.resetURLCount();
    ShifuServer.stop();
  });

  it('should return json file using util function', function (done) {
    server
      .get('/message')
      .expect('Content-type',/json/)
      .expect(202)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(202);
        done();
      });
  });

  it('should return variant json file with code 302 using util function', function (done) {
    // setMockVariant on the server
    server
      .post('/_admin/api/route/message')
      .send({ variant: 'filepath' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
      });

    server
      .get('/message')
      .expect('Content-type',/json/)
      .expect(302)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(302);
        Expect(res.body.collection.sectionOne.type).to.equal('variant');
        done();
      });
  });

  it('should return transposed json file with code 300 using util function', function (done) {
    // setMockVariant on the server
    server
      .post('/_admin/api/route/message')
      .send({ variant: 'transpose' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/message')
          .expect('Content-type',/json/)
          .expect(300)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.status).to.equal(300);
            Expect(res.body.collection.sectionOne.type).to.equal('Hello');
            Expect(res.body.collection.sectionOne.newData).to.equal('Universe');
            done();
          });
      });
  });

  it('should return json file with code 200(default) using direct function',function (done) {
    server
      .get('/product/grouping/api/collection/12345')
      .expect('Content-type',/json/)
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
        Expect(res.body.collection.sectionOne.type).to.equal('collection');
        done();
      });
  });

  it('should return json file with code 303 using direct function with variant', function (done) {
    server
      .post('/_admin/api/route/getCollection')
      .send({ variant: 'discount' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);

        server
          .get('/product/grouping/api/collection/12345')
          .expect('Content-type',/json/)
          .expect(200)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.status).to.equal(200);
            Expect(res.body.collection.sectionOne.type).to.equal('discount');
            done();
          });
      });
  });

  it('should return 404', function (done) {
    // setMockVariant on the server
    server
      .post('/_admin/api/route/message')
      .send({ variant: 'fileDoesNotExists2' })
      .expect(200)
      .end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.status).to.equal(200);
        server
          .get('/message')
          .expect(404)
          .end(function (err, res) {
            Expect(err).to.equal(null);
            Expect(res.status).to.equal(404);
            done();
          });
      });
  });

});
