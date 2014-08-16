'use strict';

//Setting up route
angular.module('submissions').config(['$stateProvider',
	function($stateProvider) {
		// Submissions state routing
		$stateProvider.
		state('listSubmissions', {
			url: '/submissions',
			templateUrl: 'modules/submissions/views/list-submissions.client.view.html'
		}).
		state('createSubmission', {
			url: '/submissions/create',
			templateUrl: 'modules/submissions/views/create-submission.client.view.html'
		}).
		state('viewSubmission', {
			url: '/submissions/:submissionId',
			templateUrl: 'modules/submissions/views/view-submission.client.view.html'
		}).
		state('editSubmission', {
			url: '/submissions/:submissionId/edit',
			templateUrl: 'modules/submissions/views/edit-submission.client.view.html'
		});
	}
]);