'use strict';

//Applications service used to communicate Applications REST endpoints
angular.module('applications').factory('Applications', ['$resource',
	function($resource) {
		return $resource('applications/:applicationId', { applicationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);