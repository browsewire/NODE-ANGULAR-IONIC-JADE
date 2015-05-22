'use strict';

angular.module('app.global')
	.run(statesEvents);

statesEvents.$inject = ['$rootScope', '$log'];

function statesEvents ($rootScope, $log) {

	$rootScope.$on('$stateChangeError',
		function (event, toState, toParams, fromState, fromParams, error) {
			$log.error('$stateChangeError. \nDetails: ', error,'\nParams: \nEvent:', event, '\nTo State: ', toState, '\nTo Params: ', toParams, '\nFrom State: ', fromState, '\nFrom Params: ', fromParams);
		});

	$rootScope.$on('$stateChangeStart',
		function (event, toState, toParams, fromState, fromParams) {
			$log.debug('$stateChangeStart. Params: \nEvent:', event, '\nTo State: ', toState, '\nTo Params: ', toParams, '\nFrom State: ', fromState, '\nFrom Params: ', fromParams);
		});

}
