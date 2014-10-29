'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
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
		}

		$scope.myVar1 = false;
		$scope.toggle1 = function() {
			$scope.myVar1 = !$scope.myVar1;
		}

		$scope.myVar2 = false;
		$scope.toggle2 = function() {
			$scope.myVar2 = !$scope.myVar2;
		}

		$scope.myVar3 = false;
		$scope.toggle3 = function() {
			$scope.myVar3 = !$scope.myVar3;
		}

		$scope.myVar4 = false;
		$scope.toggle4 = function() {
			$scope.myVar4 = !$scope.myVar4;
		}

		$scope.myVar5 = false;
		$scope.toggle5 = function() {
			$scope.myVar5 = !$scope.myVar5;
		}

		$scope.myVar6 = false;
		$scope.toggle6 = function() {
			$scope.myVar6 = !$scope.myVar6;
		}
	}
]);