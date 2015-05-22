'use strict';

angular.module('app.github')
  .controller('GithubCtrl',['$scope','$http','$log','$ionicPopup', function($scope,$http,$log,$ionicPopup) {
    
    //initialize users tab first
    $scope.NavTitle = 'Users';
    $scope.selected = 'Users';
    
    $scope.allusers = [];
     //get all users from github and bind to scope
    $http.get('https://api.github.com/users')
      .success(function(success){
          $scope.allusers = success;
     },
     function(error){
      //error in api
        $log.log(error); 
        $ionicPopup.alert({
           title: 'Message',
           template: 'Something wrong with Server'
          });
     });

    //toggle tabs     
    $scope.toggle =  function(tabs){
      $scope.selected = tabs;
      $scope.NavTitle = tabs;
    };  

  }]);

