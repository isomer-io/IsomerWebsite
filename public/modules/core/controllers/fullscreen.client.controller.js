'use strict';

angular.module('core').controller('FullScreenController', ['$scope',
    function($scope) {
        // Using angular UIs nesting feature, this allows the child scope to
        // toggle whether or not the 'container' class is being added
        // for that view
        $scope.allowFullScreen = function(shouldAllow) {
            $scope.shouldAllowFullScreen = shouldAllow;

            this.$on('$destroy', function() {
                $scope.shouldAllowFullScreen = !shouldAllow;
            });
        };

    }
]);