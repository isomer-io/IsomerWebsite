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
			templateUrl: 'modules/core/views/welcome.client.view.html'
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

		state('mastery', {
			url: '/mastery',
			templateUrl: 'modules/core/views/mastery.client.view.html'
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
		}).

       state('sitemap', {
                url: '/sitemap',
                templateUrl: 'modules/core/views/header2.client.view.html'
            }).

        state('confirm', {
                url: '/confirmwebstorm',
                templateUrl: 'modules/core/views/confirmation.client.view.html'
            });

	}
]);
