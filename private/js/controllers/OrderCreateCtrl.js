angular.module('app.controllers')
    .controller('OrderCreateCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http) {

        // add in the defaults
        $scope.order = {
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
        $scope.updateBill();

        $scope.submitOrder = function () {
            var tempOrder = $scope.order;
            tempOrder.id = 1;
            tempOrder.dateOfSale = new Date();

            if (tempOrder.lens.material === "Glass") {
                tempOrder.lens.materialOption = tempOrder.lens.glassMaterialOption;
            }
            else {
                tempOrder.lens.materialOption = tempOrder.lens.nonGlassMaterialOption;
            }

            delete tempOrder.lens.glassMaterialOption;
            delete tempOrder.lens.nonGlassMaterialOption;

            if(tempOrder.lens.segment === "Bifocal") {
                tempOrder.lens.segmentOption = tempOrder.lens.bifocalSegmentOption;
            }
            else if(tempOrder.lens.segment === "Trifocal") {
                tempOrder.lens.segmentOption = tempOrder.lens.trifocalSegmentOption;
            }

            delete tempOrder.lens.bifocalSegmentOption;
            delete tempOrder.lens.trifocalSegmentOption;

            delete tempOrder.total;
            delete tempOrder.tax;

            var newOrder = {
                fName: $scope.order.information.fName,
                lName: $scope.order.information.lName,
                orders: [angular.fromJson(angular.toJson(tempOrder))]
            };

            $http.post('/person/new', newOrder).
                success(function (data) {
                    $window.location.href = "/person/" + data.id.toString();
                }).
                error(function (data) {
                    $window.alert(data);
                });
        };
    }]);