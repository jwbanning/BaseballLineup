define(function(require) {

  var Config = require('lavaca/util/Config'),
      Promise = require('lavaca/util/Promise'),
      Connectivity = require('lavaca/net/Connectivity'),
      StringUtils = require('lavaca/util/StringUtils');
  // private vars
  var _apiURL;

  // private functions
  function _makeRequest(endpoint, params, type) {
    var promise = new Promise(),
        data,
        url,
        parseAppId,
        parseRestKey;

    _apiURL = Config.get('api_url');
    parseAppId = Config.get('parseApplicationKey');
    parseRestKey = Config.get('parseRestKey');

    params = params || {};

    url = StringUtils.format(_apiURL, endpoint);
    type = type || 'GET';

    if (type === 'GET') {
      data = params;
    } else {
      data = JSON.stringify(params);
    }

    Connectivity.ajax({
      url: url,
      dataType: 'json',
      type: type,
      beforeSend: function(request) {
        request.setRequestHeader('X-Parse-Application-Id', parseAppId);
        request.setRequestHeader('X-Parse-REST-API-Key', parseRestKey);
      },
      data: data,
      contentType:'application/json; charset=utf-8',
      dataFilter: function(data, type) {
        if (!data && type === 'json') {
          return 'null';
        }
        return data;
      },
      success: function(response, status) {
        if (status === 'success') {
          promise.resolve(response);
        } else {
          promise.reject(response);
        }
      },
      error: function() {
        var args = Array.prototype.slice.call(arguments, 0);
          promise.reject.apply(promise, args);
      }
    });
    return promise;
  }

  return {
    makeRequest: _makeRequest
  };

});