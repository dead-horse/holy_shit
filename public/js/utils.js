;(function (exports) {

  exports.isIphone = (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPhone/i));
  exports.isAndroid = navigator.userAgent.match(/Android/i);

  exports.getTemplate = function (templateId) {
    return $('#tpl_' + templateId).html();
  };

  exports.bridgeSend = function (eventName, message) {
    message = message ? JSON.stringify(message) : '';
    console.log('bridgeSend', eventName, message);
    if (window.bridge && typeof bridge.send === 'function') {
      bridge.send(eventName, message);
    }
  };

  exports.log = function (str) {
    exports.bridgeSend('log', {message: str});
  };

  exports.formatTime = function (timeStr, formater) {
    var t = timeStr.split(/[^0-9]/);
    var date = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    formater = formater || 'yyyy-M-dd H:mm';
    var pad = function (input) {
      return input < 10 ? '0' + input : '' + input;
    };
    var year = date.getFullYear().toString();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minite = date.getMinutes();
    var second = date.getSeconds();
    var output = formater.replace(/y{2,4}/g, function (matched) {
      if (matched.length === 4) {
        return year;
      } else if (matched.length === 2) {
        return year.substring(2);
      }
    }).replace(/M{1,2}/g, function (matched) {
      return matched.length === 2 ? pad(month) : month.toString();
    }).replace(/d{1,2}/g, function (matched) {
      return matched.length === 2 ? pad(day) : day.toString();
    }).replace(/H{1,2}/g, function (matched) {
      return matched.length === 2 ? pad(hour) : hour.toString();
    }).replace(/m{1,2}/g, function (matched) {
      return matched.length === 2 ? pad(minite) : minite.toString();
    }).replace(/s{1,2}/g, function (matched) {
      return matched.length === 2 ? pad(second) : second.toString();
    });
    return output;
  };

  // Wrapper for HTTP request
  exports.request = function (url, data, options, callback) {

    if (arguments.length < 2 ||
        typeof arguments[0] !== 'string' ||
        typeof arguments[arguments.length - 1] !== 'function') {
      throw new Error('Invalid Params.');
    }
    callback = arguments[arguments.length - 1];
    if (arguments.length === 2) {
      data = null;
      options = {};
    }
    if (arguments.length === 3) {
      options = {};
    }

    var method = options.method || 'GET';
    var timeout = options.timeout || 5000;

    var xhr = $.ajax({
      type: method,
      data: data ? JSON.stringify(data) : '',
      dataType: 'json',
      contentType: 'application/json',
      timeout: timeout,
      url: url,
      beforeSend: function (xhr, settings) {
        // xhr.setRequestHeader('Authentication', 'token ' + token);
      },
      success: function (data, status, xhr) {
        if (status === 'success') {
          callback(null, data);
        } else {
          callback(new Error(status));
        }
      },
      error: function (xhr, errorType, error) {
        APP.log(JSON.stringify({
          error: error,
          status: xhr.status,
          url: url,
          data: data,
          location: window.location
        }));
        callback(new Error(method + ' ' + url + ' Failed.'));
      }
    });
    xhr.onerror = function () {
      APP.log(JSON.stringify({
        status: xhr.status,
        url: url,
        data: data,
        location: window.location
      }));      
    };
  };

}(window.APP = window.APP || {}));
