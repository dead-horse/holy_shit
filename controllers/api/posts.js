/*!
 * holy_shit - controllers/posts.js
 */

'use strict';

/**
 * Module dependencies.
 */

var Posts = require('../../proxy/posts');
var config = require('../../config');
var postsPerPage = config.postsPerPage;
var verifyParams = require('../common').verifyParams;

exports.list = verifyParams({
  orderCol: {type: 'string', required: false, empty: true},
  page: {isId: true, required: false, empty: true}
}, function (params, callback) {
  var orderCol = params.order || 'id';
  var page = parseInt(params.page, 10) || 1;
  var offset = (page - 1) * postsPerPage;

  Posts.listPosts(offset, orderCol, callback);
});

exports.one = verifyParams({
  id: {isId: true}
}, function (params, callback) {
  var id = parseInt(params.id, 10);
  Posts.getPost(id, callback);
});

exports.view = verifyParams({
  id: {isId: true}
}, function (params, callback) {
  var id = parseInt(params.id, 10);
  Posts.updateViewNum(id, function (err, data) {
    if (err) {
      return callback(err);
    }
    if (data.affectedRows !== 1) {
      return callback(new Error('post #' + id + ' do not exist'));
    }
    callback(null, null);
  });
});

exports.good = verifyParams({
  id: {isId: true}
}, function (params, callback) {
  var id = parseInt(params.id, 10);
  Posts.updateGoodNum(id, function (err, data) {
    if (err) {
      return callback(err);
    }
    if (data.affectedRows !== 1) {
      return callback(new Error('post #' + id + ' do not exist'));
    }    
    callback(null, null);
  });
});
