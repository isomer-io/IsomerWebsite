'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		    }).
        state('asynchronous', {
                url: '/asynchronous',
                templateUrl: 'modules/core/views/asynchronous.client.view.html'
            }).
        state('community', {
                url: '/community',
                templateUrl: 'modules/core/views/community.client.view.html'
            }).
	}
]);