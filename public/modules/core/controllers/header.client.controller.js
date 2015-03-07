'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$http',
	function($scope, Authentication, Menus, $http) {

        //Tracking for Segment.io and in turn Google Analytics
        var analytics=analytics||[];(function(){var e=["identify","track","trackLink","trackForm","trackClick","trackSubmit","page","pageview","ab","alias","ready","group"],t=function(e){return function(){analytics.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var n=0;n<e.length;n++)analytics[e[n]]=t(e[n])})(),analytics.load=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"===document.location.protocol?"https://":"https://")+"d2dq2ahtl5zl1z.cloudfront.net/analytics.js/v1/"+e+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)};
        /**
         * Set the tracking credentials on the scope
         */

        $scope.setTracking = function() {
            $http.get('/segmentApiKey').success(function (data, status, headers, config) {

                analytics.load(data);

            }).error(function (data, status, headers, config) {
                console.log(status);
            });


        };

        $scope.setTracking();

		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.myVar = false;
		$scope.toggle = function() {
			$scope.myVar = !$scope.myVar;
		};

		$scope.myVar1 = false;
		$scope.toggle1 = function() {
			$scope.myVar1 = !$scope.myVar1;
		};

		$scope.myVar2 = false;
		$scope.toggle2 = function() {
			$scope.myVar2 = !$scope.myVar2;
		};

		$scope.myVar3 = false;
		$scope.toggle3 = function() {
			$scope.myVar3 = !$scope.myVar3;
		};

		$scope.myVar4 = false;
		$scope.toggle4 = function() {
			$scope.myVar4 = !$scope.myVar4;
		};

		$scope.myVar5 = false;
		$scope.toggle5 = function() {
			$scope.myVar5 = !$scope.myVar5;
		};

		$scope.myVar6 = false;
		$scope.toggle6 = function() {
			$scope.myVar6 = !$scope.myVar6;
		};


	}


]);
