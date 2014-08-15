'use strict';

// Subscribers controller
angular.module('subscribers').controller('SubscribersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Subscribers',
	function($scope, $stateParams, $location, Authentication, Subscribers ) {
		$scope.authentication = Authentication;

		// Create new Subscriber
		$scope.create = function() {
			// Create new Subscriber object
			var subscriber = new Subscribers ({
				name: this.name
			});

			// Redirect after save
			subscriber.$save(function(response) {
				$location.path('subscribers/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Subscriber
		$scope.remove = function( subscriber ) {
			if ( subscriber ) { subscriber.$remove();

				for (var i in $scope.subscribers ) {
					if ($scope.subscribers [i] === subscriber ) {
						$scope.subscribers.splice(i, 1);
					}
				}
			} else {
				$scope.subscriber.$remove(function() {
					$location.path('subscribers');
				});
			}
		};

		// Update existing Subscriber
		$scope.update = function() {
			var subscriber = $scope.subscriber ;

			subscriber.$update(function() {
				$location.path('subscribers/' + subscriber._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Subscribers
		$scope.find = function() {
			$scope.subscribers = Subscribers.query();
		};

		// Find existing Subscriber
		$scope.findOne = function() {
			$scope.subscriber = Subscribers.get({ 
				subscriberId: $stateParams.subscriberId
			});
		};
	}
]);