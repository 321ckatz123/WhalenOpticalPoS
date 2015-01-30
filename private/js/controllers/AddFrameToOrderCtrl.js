angular.module('app.controllers')
    .controller('AddFrameToOrderCtrl', ['$scope', '$http', '$location', '$modalInstance', function ($scope, $http, $location, $modalInstance) {

        var split = $location.path().split("/");
        var personId = split.length > 2 ? split[2] : null;

        $http.get('/frame/' + personId + '.json').
            success(function (data) {
                if (!data.length) {
                    alert("There are no existing frames tied to this person");
                    return;
                }

                $scope.existingFrames = data;
            }).
            error(function (data) {
                $window.alert(data);
                Rollbar.error('/frame/' + personId + '.json', data);
            });

        $scope.selectFrame = function(frame) {
            $modalInstance.close(frame);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
