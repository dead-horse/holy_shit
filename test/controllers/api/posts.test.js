/*!
 * holy_shit - test/controllers/api/posts.test.js 
 * Copyright(c) 2013 
 * Author: dead_horse <dead_horse@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
var app = require('../../../app');
var request = require('supertest')(app);
var should = require('should');

describe('controllers/api/posts.js', function () {
  before(function (done) {
    app.listen(0, done);
  });
  after(function (done) {
    app.close(done);
  });

  describe('GET /api/posts', function () {
    it('should get /api/posts ok', function (done) {
      request.get('/api/posts')
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.be.an.Array;
        res.body[0].should.have.keys(['id', 'title', 'url', 'pic_url', 'gmt_created', 'view_num', 'good_num']);
        done();
      });
    });

    it('should get /api/posts not exist when page too large', function (done) {
      request.get('/api/posts')
      .query({
        page: 100
      })
      .expect(200)
      .expect([], done);
    });
  });

  describe('GET /api/posts/:id', function () {
    it('should get /api/posts/1 ok', function (done) {
      request.get('/api/posts/1')
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.have.keys(['id', 'title', 'url', 'pic_url', 'gmt_created', 'good_num', 'view_num']);
        done();
      });
    });

    it('should get /api/posts/:100000 not exist', function (done) {
      request.get('/api/posts/100000')
      .expect(404, done);
    });
  });
});