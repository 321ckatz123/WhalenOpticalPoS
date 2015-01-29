angular.module('app.controllers')
    .controller('SearchCtrl', ['$scope', '$window', '$location', function ($scope, $window, $location) {
        $scope.redirectToSearch = function () {
            $window.location.href = "/search/" + ($scope.searchValue ? $scope.searchValue : "");
        };

        // if on the results pages, set the value in the search bar
        var split = $location.path().split("/");
        if (split.length < 3 || split[1] !== "search") {
            return;
        }

        $scope.searchValue = split[2];
    }]);