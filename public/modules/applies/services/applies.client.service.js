'use strict';

//Applies service used to communicate Applies REST endpoints
angular.module('applies').factory('Applies', ['$resource',
	function($resource) {
		return $resource('applies/:applyId', { applyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);