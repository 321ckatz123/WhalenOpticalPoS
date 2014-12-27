angular.module('app.controllers')
    .controller('PersonCreateCtrl', ['$scope', '$window', function ($scope, $window) {
        $scope.redirectToCreate = function() {
            $window.location.href = "/person/new";
        }
    }]);