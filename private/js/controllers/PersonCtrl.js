angular.module('app.controllers')
    .controller('PersonCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http) {
        $http.get($window.location.pathname + '.json').
            then(function ({ data }) {
                $scope.person = data;

                var orders = $scope.person.orders;
                if (orders) {
                    // inject the tax paid and total
                    angular.forEach(orders, function (order) {
                        // add all the line items together
                        order.total = _.reduce(order.bill, function (total, lineItem) {
                            return total + (lineItem.price ? lineItem.price : 0);
                        }, 0);
                        order.tax = order.total * .01;
                        order.total += order.tax;

                        // default the orders to not expanded
                        order.expand = false;
                    });

                    // sort the orders by date of last sale (then by ID on the off chance there are two orders)
                    orders = _.sortBy(orders, ['dateOfSale', 'id']).reverse();
                    $scope.person.orders = orders;

                    var mostRecentOrder = _.first(orders);
                    var secondMostRecentOrder = _.first(_.at(orders, 1));
                    $scope.person.viewPriorPrescription = false;
                    $scope.person.mostRecentAddress = mostRecentOrder.information;
                    $scope.person.mostRecentPrescription = mostRecentOrder.prescription;
                    $scope.person.priorPrescription = secondMostRecentOrder ? secondMostRecentOrder.prescription : null;
                }
            }).
            catch(function () {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        $scope.currentDate = new Date();

        $scope.changeCurrentPrescription = function () {
            $scope.person.viewPriorPrescription = !$scope.person.viewPriorPrescription;
        };

        $scope.newOrder = function() {
            $window.location.href = '/order/' + $scope.person._id;
        };

        $scope.editOrder = function(orderId) {
            $window.location.href = '/order/' + $scope.person._id + "/" + orderId.toString();
        };

        $scope.deleteOrder = function (orderId) {
            var deleteConfirm = false;
            if ($scope.person.orders.length === 1) {
                deleteConfirm = $window.confirm('Deleting this order will delete the entire person record. Are you sure?');
            }
            else {
                deleteConfirm = $window.confirm('Are you sure?');
            }

            if (deleteConfirm) {
                $http.delete('/order/' + $scope.person._id + "/" + orderId.toString()).
                    then(function () {
                        if ($scope.person.orders.length === 1) {
                            $window.location.href = "/";
                        }
                        else {
                            $window.location.reload();
                        }
                    }).
                    catch(function ({ data }) {
                        $window.alert(data);
                        Rollbar.error('/order/' + $scope.person._id + "/" + orderId.toString(), data);
                    });
            }
        };

        $scope.printReceipt = function (order) {
            var printDiv = document.getElementById('print');
            var orderDiv = document.getElementById(order.id);

            printDiv.appendChild(orderDiv.cloneNode(true));

            var afterPrint = function () {
                // clean the print section before adding new content
                printDiv.innerHTML = '';
            };
            $window.onafterprint = afterPrint;

            // add support for Chrome
            if ($window.matchMedia) {
                var mediaQueryList = $window.matchMedia('print');
                mediaQueryList.addListener(function (mql) {
                    if (!mql.matches) {
                        afterPrint();
                    }
                });
            }

            $window.print();
        };
    }]);