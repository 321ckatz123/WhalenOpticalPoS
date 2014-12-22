angular.module('app.controllers')
    .controller('PersonCtrl', ['$scope', '$window', function ($scope, $window) {
        // TODO: ACTUALLY get someone
        function getCurrentPerson(id) {
            $scope.person = tempPeople[0];
            appendOrderInformation();
        }

        function appendOrderInformation() {
            var orders = $scope.person.orders;

            if (orders) {
                // inject the tax paid and total
                angular.forEach(orders, function (order) {
                    // add all the line items together
                    order.total = _.reduce(order.bill, function (total, lineItem) {
                        return total + (lineItem.price ? lineItem.price : 0);
                    }, 0);
                    order.tax = order.total * .01;

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
        }

        $scope.changeCurrentPrescription = function () {
            $scope.person.viewPriorPrescription = !$scope.person.viewPriorPrescription;
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

        // TODO: get this out of route
        getCurrentPerson(1);
    }]);