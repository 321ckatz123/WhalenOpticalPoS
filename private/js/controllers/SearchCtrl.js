angular.module('app.controllers')
    .controller('SearchCtrl', ['$scope', '$window', '$location', function ($scope, $window, $location) {
        $scope.redirectToSearch = function () {
            $window.location.href = "/person/search/" + ($scope.searchValue ? $scope.searchValue : "");
        };

        // if on the results pages, set the value in the search bar
        var split = $location.path().split("/");
        if (split.length < 4 || split[2] !== "search") {
            return;
        }

        $scope.searchValue = split[3];
    }]);