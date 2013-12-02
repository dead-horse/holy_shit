/*!
 * holy_shit - controllers/list_page.js
 */

'use strict';

/**
 * Module dependencies.
 */


module.exports = function (req, res, next) {
  res.render('/list_page', {
    layout: false
  });
};
