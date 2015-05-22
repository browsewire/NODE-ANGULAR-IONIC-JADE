/**
 * @ngdoc overview
 * @name KindredMobile
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

'use strict';

angular.module('app', [
  //third party modules
  'ionic',
  'ui.router',
  'restangular',
  'log.ex.uo',

  //app modules
  'app.global',
  'app.github',
  'app.register',

  //our external modules
  //'mhDirectives' //We will attach it later
]);
