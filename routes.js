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

module.exports = function (app) {
  app.get('/', Home);
  app.get('/h5/list', ListPage);
};
