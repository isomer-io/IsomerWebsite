'use strict';

//Setting up route
angular.module('applications').config(['$stateProvider',
	function($stateProvider) {
		// Applications state routing
		$stateProvider.
		state('listApplications', {
			url: '/applications',
			templateUrl: 'modules/applications/views/list-applications.client.view.html'
		}).
		state('createApplication', {
			url: '/applications/create',
			templateUrl: 'modules/applications/views/create-application.client.view.html'
		}).
		state('viewApplication', {
			url: '/applications/:applicationId',
			templateUrl: 'modules/applications/views/view-application.client.view.html'
		}).
		state('editApplication', {
			url: '/applications/:applicationId/edit',
			templateUrl: 'modules/applications/views/edit-application.client.view.html'
		});
	}
]);