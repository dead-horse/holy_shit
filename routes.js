/*!
 * holy_shit - routes.js 
 * Copyright(c) 2013 
 * Author: dead_horse <dead_horse@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var Home = require('./controllers/home');
var ListPage = require('./controllers/list_page');
var Posts = require('./controllers/posts');

module.exports = function (app) {
  app.get('/', Home);
  app.get('/h5/list', ListPage);
  app.get('/api/posts', Posts.list);
  app.get('/api/post/:id', Posts.one);
  app.get('/api/post/:id/good', Posts.good);
  app.get('/api/post/:id/view', Posts.view);
};
