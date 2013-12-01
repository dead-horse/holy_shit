/*!
 * holy_shit - test/proxy/posts.test.js
 */

'use strict';

/**
 * Module dependencies.
 */

var mm = require('mm');
var should = require('should');
var mysql = require('../../common/mysql');
var Posts = require('../../proxy/posts');

describe('proxy/posts.test.js', function () {
  afterEach(mm.restore);

  describe('getPosts()', function () {
    it('should get posts order by id ok', function (done) {
      Posts.getPosts(0, 'id', function (err, data) {
        data[0].id.should.be.a.Number;
        data[0].title.should.be.a.String;
        data[0].url.should.be.a.String;
        data[0].gmtCreated.should.be.a.String;
        data[0].picUrl.should.be.a.String;
        done(err);
      });
    });
    it('should get error', function (done) {
      mm.error(mysql, 'query', 'mock error');

      Posts.getPosts(0, 'id', function (err, data) {
        err.message.should.equal('mock error');
        done();
      });
    });
  });

  describe('getPost()', function () {
    it('should get single post by id ok', function (done) {
      Posts.getPost(1, function (err, data) {
        data.id.should.be.a.Number;
        data.title.should.be.a.String;
        data.url.should.be.a.String;
        data.gmtCreated.should.be.a.String;
        data.picUrl.should.be.a.String;
        data.viewNum.should.be.above(-1);
        data.goodNum.should.be.above(-1);
        done(err);
      });
    });
    it('should get error', function (done) {
      mm.error(mysql, 'query', 'mock error');

      Posts.getPost(1, function (err, data) {
        err.message.should.equal('mock error');
        done();
      });
    });
  });
});