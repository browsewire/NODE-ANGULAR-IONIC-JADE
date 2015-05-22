'use strict';

angular.module('app.global')
  .controller('RootCtrl', rootCtrl);

rootCtrl.$inject = ['$log'];
function rootCtrl ($log) {
  //var vm = this;
  init();
  function init () {
    $log = $log.getInstance('RootCtrl');
  }
}
