'use strict';

angular
  .module('app.global')
  .constant('apiUrl', apiUrl());

function apiUrl () {
  var forceProductionApi = true;
  if (!isLocalhost() || forceProductionApi) {
    return 'http://api.imkindred.com/'; //production
  } else {
    return 'http://alexander.drts.com.au/api/v1/'; //dev
  }
}

function isLocalhost () {
  var host = window.location.host; //jshint ignore:line
  return host.indexOf('localhost') >= 0 || host.indexOf('127.0.0.1') >= 0;
}
