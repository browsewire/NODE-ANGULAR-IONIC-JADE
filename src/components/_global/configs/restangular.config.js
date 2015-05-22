'use strict';

angular
  .module('app.global')
  .config(restangularConfig);

restangularConfig.$inject = ['RestangularProvider', 'apiUrl'];
function restangularConfig(RestangularProvider, apiUrl) {
  RestangularProvider.setBaseUrl(apiUrl);
  RestangularProvider.setDefaultHttpFields({cache: false});
}
