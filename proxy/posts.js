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
    pic_url AS picUrl \
  FROM \
    posts';

function getPosts(offset, orderCol, callback) {

  var sql = GET_POSTS_SQL;
  sql = sql + ' ORDER BY ' + orderCol;
  sql = sql + ' LIMIT ' + offset + ',' + postsPerPage;

  mysql.query(sql, callback);
}
exports.getPosts = getPosts;

var GET_POST_SQL = 
  'SELECT \
    id, \
    title, \
    url, \
    gmt_created AS gmtCreated, \
    pic_url AS picUrl, \
    view_num AS viewNum, \
    good_num AS goodNum \
  FROM \
    posts \
  WHERE \
    id = :id';

function getPost(id, callback) {
  mysql.queryOne({sql: GET_POST_SQL, params: {id: id}}, function (err, row) {
    if (err) {
      return callback(err);
    }
    row = row || {};
    row.viewNum = Number(row.viewNum) || 0;
    row.goodNum = Number(row.goodNum) || 0;
    return callback(null, row);
  });
}
exports.getPost = getPost;

var UPDATE_VIEW_NUM_SQL = 
  'UPDATE posts SET view_num = view_num + 1 WHERE id = :id';

function updateViewNum(id, callback) {
  mysql.query({sql: UPDATE_VIEW_NUM_SQL, params: {id: id}}, callback);
}
exports.updateViewNum = updateViewNum;

var UPDATE_GOOD_NUM_SQL = 
  'UPDATE posts SET good_num = good_num + 1 WHERE id = :id';

function updateGoodNum(id, callback) {
  mysql.query({sql: UPDATE_GOOD_NUM_SQL, params: {id: id}}, callback);
}
exports.updateGoodNum = updateGoodNum;

