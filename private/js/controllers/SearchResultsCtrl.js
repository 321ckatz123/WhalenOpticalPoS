angular.module('app.controllers')
    .controller('SearchResultsCtrl', ['$scope', '$window', '$http', '$location', function ($scope, $window, $http, $location) {
        var split = $location.path().split("/");
        if (split.length < 3 || split[2] === '') {
            $scope.needSearch = true;
            return;
        }

        $http.get($window.location.pathname + '.json').
            then(function ({ data }) {
                $scope.searchResults = data;
            }).
            catch(function ({ data }) {
                $window.alert(data);
                Rollbar.error($window.location.pathname + '.json', data);
            });
    }]);