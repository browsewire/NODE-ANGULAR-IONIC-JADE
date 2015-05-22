'use strict';

angular
	.module('app.global')
	.run(ionicRun);

ionicRun.$inject = ['$ionicPlatform'];
function ionicRun ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		/*
		 if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
		 cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		 }
		 if (window.StatusBar) {
		 // org.apache.cordova.statusbar required
		 StatusBar.styleLightContent();
		 }
		 });
		 */
		// add possible global event handlers here
	});
}