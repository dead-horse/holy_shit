/*!
 * holy_shit - controllers/posts.js
 */

'use strict';

/**
 * Module dependencies.
 */

var transformer = require('var-style');
var Posts = require('../proxy/posts');
var config = require('../config');
var postsPerPage = config.postsPerPage;

exports.list = function (req, res, next) {
  var query = req.query || {};
  var orderCol = query.order || 'id';
  var page = parseInt(query.page, 10) || 1;
  var offset = (page - 1) * postsPerPage;

  Posts.getPosts(offset, orderCol, function (err, rows) {
    if (err) {
      return next(err);
    }
    res.json(transformer.camelToSnake(rows));
  });
};

exports.one = function (req, res, next) {
  var params = req.params || {};
  var id = parseInt(params.id) || 0;

  Posts.getPost(id, function (err, row) {
    if (err) {
      return next(err);
    }
    res.json(transformer.camelToSnake(row));
  });
};

exports.view = function (req, res, next) {
  var params = req.params || {};
  var id = parseInt(params.id) || 0;

  Posts.updateViewNum(id, function (err, row) {
    if (err) {
      return next(err);
    }
    res.json(transformer.camelToSnake(row));
  });
};

exports.good = function (req, res, next) {
  var params = req.params || {};
  var id = parseInt(params.id) || 0;

  Posts.updateGoodNum(id, function (err, row) {
    if (err) {
      return next(err);
    }
    res.json(transformer.camelToSnake(row));
  });
};