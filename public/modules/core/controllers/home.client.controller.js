'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        //set the home page to allow fullscreen

        $scope.allowFullScreen(true);
	}
]);