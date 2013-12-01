/*!
 * holy_shit - common/mysql.js
 */

'use strict';

/**
 * Module dependencies.
 */

var config = require('../config');
var easymysql = require('easymysql');
var logger = require('./logger');

var client = easymysql.create({maxconnection: config.mysqlMaxConnection});

client.on('error', function (err) {
  logger.error(err);
});

for (var i = 0; i < config.mysqlServers.length; i++) {
  var item = config.mysqlServers[i];
  client.addserver({
    host: item.host,
    port: item.port,
    user: item.user,
    password: item.password,
    database: config.mysqlDatabase,
  });
}

client.queryOne = function queryOne(query, callback) {
  this.query(query, function (err, rows) {
    if (err) {
      return callback(err);
    }
    callback(null, rows && rows[0]);
  });
};

module.exports = client;
