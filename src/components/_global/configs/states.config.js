'use strict';

angular.module('app.global')
  .config(statesConfig);

statesConfig.$inject = ['$stateProvider'];

function statesConfig ($stateProvider) {
  $stateProvider
    .state({
      name: 'root',
      url: '',
      abstract: true,
      template: '<ui-view></ui-view>',
      controller: 'RootCtrl'
    });
}
