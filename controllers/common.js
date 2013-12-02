/*!
 * holy_shit - controllers/common.js
 * Author: dead_horse <dead_horse@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var p = require('parameter');

/**
 * 参数验证辅助工具
 * @param {Object} rules 参数验证规则
 * {
 *   uid: {isId: true}, // isId 代表字符串形式的数字
 *   date: {isDate: true}, // isDate 代表 `YYYY-MM-DD` 格式的日期
 *   limit: {type: 'number', required: false } // 可选参数, 类型判断: 'number', 'string', 'object' or 'function'
 * }
 * @param {Function(params, callback, ...)} fn
 * @return {Function} wrap function
 */
exports.verifyParams = function (rules, fn) {
  return function verifyParamsHandle(params, callback) {
    var errors = p.verify(params, rules);
    if (errors) {
      var err = new Error('Validation Failed');
      err.name = 'ParameterError';
      err.status = 422;
      err.params = params;    
      err.errors = errors;
      return callback(err);
    }

    fn.apply(null, arguments);
  };
};
