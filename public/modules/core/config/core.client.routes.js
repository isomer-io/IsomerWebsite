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

		//what's this route for?
		//
        //state('tree', {
        //       url: '/tree',
	 	//       templateUrl: 'modules/core/views/asynchronous.client.view.html'
		//}).

        state('asynchronous', {
			url: '/asynchronous',
			templateUrl: 'modules/core/views/community.client.view.html'
		}).

		state('community', {
			url: '/community',
			templateUrl: 'modules/core/views/community.client.view.html'
		}).

		state('fullstack', {
			url: '/fullstack',
			templateUrl: 'modules/core/views/fullstack.client.view.html'
		}).

		state('instructors', {
		url: '/instructors',
		templateUrl: 'modules/core/views/instructors.client.view.html'
		}).

		state('pricing', {
			url: '/pricing',
			templateUrl: 'modules/core/views/pricing.client.view.html'
		}).

		state('realworld', {
			url: '/realworld',
			templateUrl: 'modules/core/views/realworld.client.view.html'
		}).

		state('students', {
			url: '/students',
			templateUrl: 'modules/core/views/students.client.view.html'
		}).

		state('welcome', {
			url: '/welcome',
			templateUrl: 'modules/core/views/welcome.client.view.html'
		});

	}
]);
