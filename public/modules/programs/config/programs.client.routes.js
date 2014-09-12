'use strict';

//Setting up route
angular.module('programs').config(['$stateProvider',
	function($stateProvider) {
		// Programs state routing
		$stateProvider.
		state('listPrograms', {
			url: '/program',
			templateUrl: 'modules/programs/views/list-programs.client.view.html'
		}).
		state('createProgram', {
			url: '/programs/create',
			templateUrl: 'modules/programs/views/create-program.client.view.html'
		}).
		state('viewProgram', {
			url: '/programs/:programId',
			templateUrl: 'modules/programs/views/view-program.client.view.html'
		}).
		state('editProgram', {
			url: '/programs/:programId/edit',
			templateUrl: 'modules/programs/views/edit-program.client.view.html'
		});
	}
]);