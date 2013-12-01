/*!
 * holy_shit - controllers/posts.js
 */

'use strict';

/**
 * Module dependencies.
 */

var Posts = require('../proxy/posts');
var config = require('../config');
var postsPerPage = config.postsPerPage;

module.exports = function (req, res, next) {
  var query = req.query || {};
  var orderCol = query.order || 'id';
  var page = parseInt(query.page, 10) || 1;
  var offset = (page - 1) * postsPerPage;

  Posts.getPosts(offset, orderCol, function (err, rows) {
    if (err) {
      return next(err);
    }
    res.json(rows);
  });
};
