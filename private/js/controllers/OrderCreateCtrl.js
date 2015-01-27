angular.module('app.controllers')
    .controller('OrderCreateCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http) {
        /*{
         id: 1,
         dateOfSale: new Date("01/02/2014"),
         notes: "These are some notes. This is even a lot of notes. These are some notes. " +
         "This is even a lot of notes. These are some notes. This is even a lot of notes. " +
         "These are some notes. This is even a lot of notes. These are some notes. This is even a lot of notes."
         information: {
         fName: "Trevor",
         lName: "Hawke",
         address1: "123 Main St.",
         address2: "Suite 200",
         city: "Hollywood",
         state: "CA",
         zip: 12345,
         phone: "1234567890",
         dob: new Date("10/25/1995")
         },
         prescription: {
         pd: "58",
         right: {
         sphere: "-4",
         cylinder: "-.5",
         axis: "180",
         prism: ".5",
         base: "down",
         reading: "+2"
         },
         left: {
         sphere: "-3",
         cylinder: "-1",
         axis: "90",
         prism: "1.5",
         base: "up",
         reading: "-2"
         }
         },
         lens: {
         material: "Glass",
         materialOption: "Extra Active",
         segment: "Single"
         },
         frame: {
         name: "Oakley",
         color: "Gray",
         lens: "52",
         ed: "80",
         vertical: "24",
         bridge: "18",
         temple: "130"
         },
         bill: [
         {
         name: "Lens",
         price: 99.99
         },
         {
         name: "Frame",
         price: 299.99
         }
         ]
         }*/

        // add in the defaults
        $scope.order = {
            lens: {
                material: "Plastic",
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

        // TODO: set the material correctly on save
        $scope.submitOrder = function() {
            var tempOrder = $scope.order;

            $http.post('/person/new', tempOrder).
                success(function (data) {
                    $window.location.href = "/person/" + data.id.toString();
                }).
                error(function (data) {
                    $window.alert(data);
                });
        };
    }]);