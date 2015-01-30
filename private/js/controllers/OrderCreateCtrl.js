angular.module('app.controllers')
    .controller('OrderCreateCtrl', ['$scope', '$window', '$http', '$location', '$modal', function ($scope, $window, $http, $location, $modal) {
        var defaultOrder = {
            lens: {
                material: "Plastic",
                nonGlassMaterialOption: "None",
                segment: "Single"
            },
            bill: [
                {
                    name: "Lens"
                },
                {
                    name: "Frame"
                }
            ]
        };

        // see what information was passed into the page
        var split = $location.path().split("/");
        var personId = split.length > 2 ? split[2] : null;
        var orderId = split.length > 3 ? split[3] : null;

        $scope.removeLineItem = function (lineItem) {
            var index = $scope.order.bill.indexOf(lineItem);
            $scope.order.bill.splice(index, 1);
            $scope.updateBill();
        };

        $scope.addLineItem = function () {
            $scope.order.bill.push({});
            $scope.updateBill();
        };

        $scope.updateBill = function () {
            $scope.order.total = _.reduce($scope.order.bill, function (total, lineItem) {
                return total + (lineItem.price ? lineItem.price : 0);
            }, 0);
            $scope.order.tax = $scope.order.total * .01;
            $scope.order.total += $scope.order.tax;
        };

        $scope.submitOrder = function () {
            var tempOrder = $scope.order;
            if (!personId && !orderId) {
                tempOrder.id = 1;
            }

            if (!orderId) {
                tempOrder.dateOfSale = new Date();
            }

            if (tempOrder.lens.material === "Glass") {
                tempOrder.lens.materialOption = tempOrder.lens.glassMaterialOption;
            }
            else {
                tempOrder.lens.materialOption = tempOrder.lens.nonGlassMaterialOption;
            }

            delete tempOrder.lens.glassMaterialOption;
            delete tempOrder.lens.nonGlassMaterialOption;

            if (tempOrder.lens.segment === "Bifocal") {
                tempOrder.lens.segmentOption = tempOrder.lens.bifocalSegmentOption;
            }
            else if (tempOrder.lens.segment === "Trifocal") {
                tempOrder.lens.segmentOption = tempOrder.lens.trifocalSegmentOption;
            }

            delete tempOrder.lens.bifocalSegmentOption;
            delete tempOrder.lens.trifocalSegmentOption;

            delete tempOrder.total;
            delete tempOrder.tax;

            var newOrder = {
                fName: tempOrder.information ? tempOrder.information.fName : '',
                lName: tempOrder.information ? tempOrder.information.lName : '',
                orders: [angular.fromJson(angular.toJson(tempOrder))]
            };

            $http.post($window.location.pathname, newOrder).
                success(function (data) {
                    $window.location.href = "/person/" + data.id.toString();
                }).
                error(function (data) {
                    $window.alert(data);
                    Rollbar.error($window.location.pathname, data);
                });
        };

        $scope.getExistingFrames = function () {
            var modalInstance = $modal.open({
                templateUrl: '/existingFrames.html',
                controller: 'AddFrameToOrderCtrl'
            });

            modalInstance.result.then(function (selectedFrame) {
                $scope.order.frame = selectedFrame;
            });
        };

        if (personId || orderId) {
            $http.get($window.location.pathname + '.json').
                success(function (data) {
                    if (orderId) {
                        $scope.order = data.order;
                        $scope.update = true;
                    }
                    else if (personId) {
                        $scope.order = defaultOrder;
                        $scope.order.id = data.order.id + 1;
                        $scope.order.information = data.order.information;
                        $scope.order.prescription = data.order.prescription;
                    }

                    if ($scope.order.lens) {
                        if ($scope.order.lens.material === "Glass") {
                            $scope.order.lens.glassMaterialOption = $scope.order.lens.materialOption;
                        }
                        else {
                            $scope.order.lens.nonGlassMaterialOption = $scope.order.lens.materialOption;
                        }

                        if ($scope.order.lens.segment === "Bifocal") {
                            $scope.order.lens.bifocalSegmentOption = $scope.order.lens.segmentOption;
                        }
                        else if ($scope.order.lens.segment === "Trifocal") {
                            $scope.order.lens.trifocalSegmentOption = $scope.order.lens.segmentOption;
                        }
                    }
                    $scope.updateBill();
                }).
                error(function (data) {
                    $window.alert(data);
                    Rollbar.error($window.location.pathname + '.json', data);
                });
        }
        else {
            // add in the defaults for a brand new order
            $scope.order = defaultOrder;
            $scope.updateBill();
        }
    }]
);