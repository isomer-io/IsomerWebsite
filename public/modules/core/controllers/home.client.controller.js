'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        //$scope.open = function() {
        //    $scope.title ='Open';
        //    $scope.subtitle = 'Our curriculum is free and open source. We use agile development on all projects.';
        //};
        //
        //$scope.isomer = function() {
        //    $scope.title = 'Isomer';
        //    $scope.subtitle = 'The Open Source, blended classroom, non-profit, project-focused, community driven developer bootcamp.';
        //};
        //
        //$scope.fullStack = function() {
        //    $scope.title = 'Full-Stack';
        //    $scope.subtitle = 'Understanding the entire stack is an essential engineering skill. From Databases to client, we\'ve got you covered.';
        //};
        //
        //$scope.nonProfit = function() {
        //    $scope.title = 'Non-Profit';
        //    $scope.subtitle = 'Our aim is to provide the best education as accessibly as possible. Know that your tuition is only being allocated for as efficient of teaching as possible.';
        //};
        //
        //$scope.isomer();

        $scope.selection = {
            aboutIsomer: true,
            community: false,
            curriculum: false,
            realWorldApplication: false,
            students: false
        };

        $scope.selectContent = function(content) {
            if (content === 'About Isomer') {
                $scope.selection
            }
            if (content === 'Community') {

            }
            if (content === 'Curriculum') {

            }
            if (content === 'Real World Application') {

            }
            if (content === 'Students') {

            }
        };

        $scope.detailView = '/modules/core/views/community.client.view.html';

        $scope.getView = function() {
            return '/modules/core/views/community.client.view.html';
        }

	}
]);
