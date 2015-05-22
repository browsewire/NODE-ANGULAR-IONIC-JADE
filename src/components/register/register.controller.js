'use strict';

angular.module('app.register')
  .controller('RegisterCtrl',['$scope','$log','$ionicPopup', function($scope,$log,$ionicPopup) {
   
    //initialize user for login 
    $scope.user =  {};

    //register user
    $scope.register = function(){
         $log.log($scope.user);
          $ionicPopup.alert({
           title: 'Message',
           template: 'Registered Successfully'
          });
    }; 

  }]);

