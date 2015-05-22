'use strict';

angular
  .module('app.global')
  .config(logConfig);

logConfig.$inject = ['logExProvider'];
function logConfig(logExProvider) {
  logExProvider.enableLogging(true);
  logExProvider.overrideLogPrefix(function (className) {
    var $injector = angular.injector([ 'ng' ]);
    var $filter = $injector.get( '$filter' );
    var separator = ' ::';
    var format = 'yyyy.mm.dd HH:mm:ss';
    var now = $filter('date')(new Date(), format);
    return '['+now+']' + (className ? ' '+className + separator+' ' : '');
  });
}
