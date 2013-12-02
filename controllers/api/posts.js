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

  Posts.getPosts(offset, orderCol, callback);
});

exports.one = verifyParams({
  id: {idId: true}
}, function (params, callback) {
  var id = parseInt(params.id, 10) || 0;
  Posts.getPost(id, callback);
});

exports.view = verifyParams({
  id: {idId: true}
}, function (params, callback) {
  var id = parseInt(params.id, 10) || 0;
  Posts.updateViewNum(id, callback);
});

exports.good = verifyParams({
  id: {idId: true}
}, function (params, callback) {
  var id = parseInt(params.id, 10) || 0;
  Posts.updateGoodNum(id, callback);
});
