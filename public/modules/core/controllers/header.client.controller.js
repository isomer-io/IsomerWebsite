'use strict';

angular.module('core')
.controller('MainController', function($scope) {
    $scope.toggle = function() {
        $scope.$broadcast('event:toggle');
    }
}) //
.directive('toggle', function() {
    return function(scope, elem, attrs) {
        scope.$on('event:toggle', function() {
            elem.slideToggle();
        });
    };
});