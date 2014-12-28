angular.module('app.controllers')
    .controller('SearchCtrl', ['$scope', '$window', function ($scope, $window) {
        $scope.redirectToSearch = function () {
            $window.location.href = "/person/search/" + $scope.searchValue;
        };
    }]);