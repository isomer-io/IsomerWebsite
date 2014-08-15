'use strict';

//Subscribers service used to communicate Subscribers REST endpoints
angular.module('subscribers').factory('Subscribers', ['$resource',
	function($resource) {
		return $resource('subscribers/:subscriberId', { subscriberId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);