'use strict';

//Programs service used to communicate Programs REST endpoints
angular.module('programs').factory('Programs', ['$resource',
	function($resource) {
		return $resource('programs/:programId', { programId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);