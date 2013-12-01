$(function ($) {

  ejs.open = '{%';
  ejs.close = '%}';

  // https://developer.mozilla.org/en-US/docs/Web/API/window.onerror?redirect=no
  var __gOldOnError = window.onerror;
  // Override previous handler.
  window.onerror = function tsicErrorHandler(errorMsg, url, lineNumber) {

    if (__gOldOnError) {
      // Call previous handler.
      return __gOldOnError(errorMsg, url, lineNumber);
    }

    // Just let default handler run.
    return false;
  };
});
