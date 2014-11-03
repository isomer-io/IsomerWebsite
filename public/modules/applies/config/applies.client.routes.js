'use strict';

//Setting up route
angular.module('applies').config(['$stateProvider',
	function($stateProvider) {
		// Applies state routing
		$stateProvider.
		state('listApplies', {
			url: '/applies',
			templateUrl: 'modules/applies/views/list-applies.client.view.html'
		}).
		state('createApply', {
			url: '/applies/create',
			templateUrl: 'modules/applies/views/create-apply.client.view.html'
		}).
		state('viewApply', {
			url: '/applies/:applyId',
			templateUrl: 'modules/applies/views/view-apply.client.view.html'
		}).
		state('editApply', {
			url: '/applies/:applyId/edit',
			templateUrl: 'modules/applies/views/edit-apply.client.view.html'
		});
	}
]);