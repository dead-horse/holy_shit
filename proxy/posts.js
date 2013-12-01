/*!
 * holy_shit - proxy/posts.js
 */

'use strict';

/**
 * Module dependencies.
 */

var mysql = require('../common/mysql');
var config = require('../config');
var postsPerPage = config.postsPerPage;

var GET_POSTS_SQL = 
  'SELECT \
    id, \
    title, \
    url, \
    gmt_created AS gmtCreated, \
    pic_url AS picUrl, \
    good_num AS goodNum, \
    view_num AS viewNum, \
    brief \
  FROM \
    posts';

function getPosts(offset, orderCol, callback) {

  var sql = GET_POSTS_SQL;
  sql = sql + ' ORDER BY ' + orderCol;
  sql = sql + ' LIMIT ' + offset + ',' + postsPerPage;

  mysql.query(sql, function (err, data) {
    if (err) {
      return callback(err);
    }
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      row.goodNum = Number(row.goodNum) || 0;
      row.viewNum = Number(row.viewNum) || 0;
    }
    callback(null, data);
  });
}

exports.getPosts = getPosts;
