'use strict';

//Setting up route
angular.module('programs').config(['$stateProvider',
	function($stateProvider) {
		// Programs state routing
		$stateProvider.
		state('viewCourse', {
			url: '/program',
			templateUrl: 'modules/course/views/course.client.view.html'
		});
	}
]);