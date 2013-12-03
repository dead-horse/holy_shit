/*!
 * holy_shit - api_routes.js 
 * Copyright(c) 2013 
 * Author: dead_horse <dead_horse@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var Posts = require('./controllers/api/posts');
var restfulWrap = require('restful-wrap');
var transformer = require('var-style');
var logger = require('./common/logger');
var config = require('./config');

function apiRoutes(app) {
  var api = restfulWrap(app, {
    inputTransformer: transformer.snackToCamel,
    outputTransformer: transformer.camelToSnake
  });
  api.get('/posts', Posts.list);
  api.get('/posts/:id', Posts.one);
  api.patch('/posts/:id/good', Posts.good);
  api.patch('/posts/:id/view', Posts.view);
}

apiRoutes.notFound = restfulWrap.notFound();
apiRoutes.error = restfulWrap.error({
  logger: logger,
  debug: config.debug
});

module.exports = apiRoutes;
