angular.module('app', ['app.controllers', 'app.filters'], ['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]);