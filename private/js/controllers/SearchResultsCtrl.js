angular.module('app.controllers')
    .controller('SearchResultsCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http) {
        $http.get($window.location.pathname + '.json').
            success(function (data) {
                $scope.searchResults = data;
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        $scope.redirectToPersonDetail = function(id) {
            $window.location.href = "/person/" + id;
        }
    }]);