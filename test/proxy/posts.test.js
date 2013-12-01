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
        data[0].id.should.be.an.Number;
        data[0].title.should.be.an.String;
        data[0].url.should.be.an.String;
        data[0].gmtCreated.should.be.an.String;
        data[0].picUrl.should.be.an.String;
        data[0].goodNum.should.be.an.Number;
        data[0].viewNum.should.be.an.Number;
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

});