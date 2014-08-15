'use strict';

//Setting up route
angular.module('subscribers').config(['$stateProvider',
	function($stateProvider) {
		// Subscribers state routing
		$stateProvider.
		state('listSubscribers', {
			url: '/subscribers',
			templateUrl: 'modules/subscribers/views/list-subscribers.client.view.html'
		}).
		state('createSubscriber', {
			url: '/subscribers/create',
			templateUrl: 'modules/subscribers/views/create-subscriber.client.view.html'
		}).
		state('viewSubscriber', {
			url: '/subscribers/:subscriberId',
			templateUrl: 'modules/subscribers/views/view-subscriber.client.view.html'
		}).
		state('editSubscriber', {
			url: '/subscribers/:subscriberId/edit',
			templateUrl: 'modules/subscribers/views/edit-subscriber.client.view.html'
		});
	}
]);