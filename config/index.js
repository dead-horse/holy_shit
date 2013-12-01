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

var config = {
  version: pkg.version,
  webPort: 7001,
  enableCluster: false,
  debug: true,
  viewCache: true,
  sessionSecret: 'input your own sesson secret',
  sessionCookie: 'input your own session cookie',

  mysqlServers: [
    {
      host: 'keydiary.mysql.rds.aliyuncs.com',
      port: 3306,
      user: 'god_posts',
      password: 'internet'
    }
  ],
  mysqlDatabase: 'god_posts',
  mysqlMaxConnection: 10
};

// load config/config.js, everything in config.js will cover the same key in index.js
var customConfig = path.join(root, 'config/config.js');
if (fs.existsSync(customConfig)) {
  var options = require(customConfig);
  for (var k in options) {
    config[k] = options[k];
  }
}

module.exports = config;
