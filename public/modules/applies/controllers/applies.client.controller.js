'use strict';

// Applies controller
angular.module('applies').controller('AppliesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Applies',
	function($scope, $stateParams, $location, Authentication, Applies ) {
		$scope.authentication = Authentication;

		// Create new Apply
		$scope.create = function() {
			// Create new Apply object
			var apply = new Applies ({
				name: this.name
			});

			// Redirect after save
			apply.$save(function(response) {
				$location.path('applies/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Apply
		$scope.remove = function( apply ) {
			if ( apply ) { apply.$remove();

				for (var i in $scope.applies ) {
					if ($scope.applies [i] === apply ) {
						$scope.applies.splice(i, 1);
					}
				}
			} else {
				$scope.apply.$remove(function() {
					$location.path('applies');
				});
			}
		};

		// Update existing Apply
		$scope.update = function() {
			var apply = $scope.apply ;

			apply.$update(function() {
				$location.path('applies/' + apply._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Applies
		$scope.find = function() {
			$scope.applies = Applies.query();
		};

		// Find existing Apply
		$scope.findOne = function() {
			$scope.apply = Applies.get({ 
				applyId: $stateParams.applyId
			});
		};
	}
]);