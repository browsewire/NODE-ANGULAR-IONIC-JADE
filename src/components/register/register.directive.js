'use strict';

angular.module('app.register')
  .directive('confirmPassword', function() {
  return {
    require: 'ngModel',
    scope: {
      password: '=confirmPassword'
    },
     link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {  var noMatch = viewValue !== scope.password;
        ctrl.$setValidity('match', !noMatch);
        return viewValue;
      });

      scope.$watch('password', function(value) {
        ctrl.$setValidity('match', value === ctrl.$viewValue);
      });
    }
  };
});

