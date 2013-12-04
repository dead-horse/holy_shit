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

var LIST_POSTS_SQL = 
  'SELECT \
    id, \
    title, \
    url, \
    gmt_created AS gmtCreated, \
    pic_url AS picUrl, \
    view_num AS viewNum, \
    good_num AS goodNum \
  FROM \
    posts';

function listPosts(offset, orderCol, callback) {

  var sql = LIST_POSTS_SQL;
  sql = sql + ' ORDER BY ' + orderCol + ' DESC';
  sql = sql + ' LIMIT ' + offset + ',' + postsPerPage;

  mysql.query(sql, callback);
}
exports.listPosts = listPosts;

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
    id = ?';

function getPost(id, callback) {
  mysql.queryOne(GET_POST_SQL, [id], function (err, row) {
    if (err || !row) {
      return callback(err, row);
    }
    row.viewNum = Number(row.viewNum) || 0;
    row.goodNum = Number(row.goodNum) || 0;
    return callback(null, row);
  });
}
exports.getPost = getPost;

var ADD_POST_SQL = 
  'INSERT INTO posts(title, url, pic_url, view_num, good_num, gmt_created)\
  VALUES(?, ?, ?, 0, 0, NOW())';
function addPost(params, callback) {
  var values = [params.title, params.url, params.picUrl];
  mysql.query(ADD_POST_SQL, values, function (err, data) {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        err.message = 'post#' + params.url + ' exists';
      }
      return callback(err);
    }
    getPost(data.insertId, callback);
  });
}
exports.addPost = addPost;

var UPDATE_VIEW_NUM_SQL = 
  'UPDATE posts SET view_num = view_num + 1 WHERE id = ?';

function updateViewNum(id, callback) {
  mysql.query(UPDATE_VIEW_NUM_SQL, [id], callback);
}
exports.updateViewNum = updateViewNum;

var UPDATE_GOOD_NUM_SQL = 
  'UPDATE posts SET good_num = good_num + 1 WHERE id = ?';

function updateGoodNum(id, callback) {
  mysql.query(UPDATE_GOOD_NUM_SQL, [id], callback);
}
exports.updateGoodNum = updateGoodNum;

