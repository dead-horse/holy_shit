/*!
 * holy_shit - config/index.js 
 * Copyright(c) 2013 
 * Author: dead_horse <dead_horse@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

fs.existsSync = fs.existsSync || path.existsSync;
var pkg = require('../package.json');

var root = path.dirname(__dirname);
var logdir = path.join(root, '.tmp', 'logs');

var config = {
  version: pkg.version,
  webPort: 7001,
  enableCluster: false,
  debug: true,
  viewCache: false,
  sessionSecret: 'input your own sesson secret',
  sessionCookie: 'input your own session cookie',

  logdir: logdir,

  postsPerPage: 10, // 每页10贴
  mysql: {
    host: 'keydiary.mysql.rds.aliyuncs.com',
    port: 3306,
    user: 'god_posts',
    password: 'internet',
    database: 'god_posts',
    connectionLimit: 5,
    multipleStatements: true
  }
};

// load config/config.js, everything in config.js will cover the same key in index.js
var customConfig = path.join(root, 'config/config.js');
if (fs.existsSync(customConfig)) {
  var options = require(customConfig);
  for (var k in options) {
    config[k] = options[k];
  }
}

mkdirp.sync(config.logdir);

module.exports = config;
