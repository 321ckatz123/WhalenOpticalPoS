angular.module('app', ['app.controllers', 'app.filters', 'mm.foundation'], ['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]);