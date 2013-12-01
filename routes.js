/*!
 * holy_shit - routes.js 
 * Copyright(c) 2013 
 * Author: dead_horse <dead_horse@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
var home = require('./controllers/home');
var posts = require('./controllers/posts');

module.exports = function (app) {
  app.get('/', home);
  app.get('/posts', posts);
};
