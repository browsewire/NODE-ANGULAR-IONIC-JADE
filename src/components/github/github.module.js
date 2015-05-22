'use strict';

angular
  .module('app.github',[])
  .config(githubStateConfig);

githubStateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function githubStateConfig ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('','/github ');
  $urlRouterProvider.otherwise('/github');

  $stateProvider
    
    .state({
      name: 'root.github',
      url: '/github',
      controller:'GithubCtrl',
      controllerAs: 'vm',
      templateUrl: 'components/github/github.template.html'
    });

}