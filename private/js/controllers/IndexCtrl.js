angular.module('app.controllers')
    .controller('IndexCtrl', ['$scope', function ($scope) {
        var orders = [{
            id: 1,
            dateOfSale: new Date("01/02/2014"),
            information: {
                fName: "Trevor",
                lName: "Hawke",
                address1: "123 Main St.",
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
            ],
            notes: "These are some notes. This is even a lot of notes. These are some notes. " +
            "This is even a lot of notes. These are some notes. This is even a lot of notes. " +
            "These are some notes. This is even a lot of notes. These are some notes. This is even a lot of notes."
        },
            {
                id: 2,
                dateOfSale: new Date("01/01/2014"),
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
                    pd: "48",
                    right: {
                        sphere: "4",
                        cylinder: ".5",
                        axis: "-180",
                        prism: "-5",
                        base: "up",
                        reading: "-9"
                    },
                    left: {
                        sphere: "3",
                        cylinder: "1",
                        axis: "270",
                        prism: "-1.5",
                        base: "down",
                        reading: "2"
                    }
                },
                lens: {
                    material: "1.74",
                    materialOption: "Antireflective",
                    segment: "Progressive"
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
                        price: 1099.99
                    },
                    {
                        name: "Frame",
                        price: 299.99
                    }
                ],
                notes: "These are some notes. This is even a lot of notes. These are some notes. " +
                "This is even a lot of notes. These are some notes. This is even a lot of notes. " +
                "These are some notes. This is even a lot of notes. These are some notes. This is even a lot of notes."
            },
            {
                id: 3,
                dateOfSale: new Date("01/01/2014"),
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
                    pd: "48",
                    right: {
                        sphere: "4",
                        cylinder: ".5",
                        axis: "-180",
                        prism: "-5",
                        base: "up",
                        reading: "-9"
                    },
                    left: {
                        sphere: "3",
                        cylinder: "1",
                        axis: "3",
                        prism: "-1.5",
                        base: "down",
                        reading: "2"
                    }
                },
                lens: {
                    material: "Polycarb",
                    materialOption: "Photo Fusion",
                    segment: "Bifocal",
                    segmentOption: "Occupational"
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
                        price: 9.47
                    },
                    {
                        name: "Frame",
                        price: 875.68
                    }
                ],
                notes: "These are some notes. This is even a lot of notes. These are some notes. " +
                "This is even a lot of notes. These are some notes. This is even a lot of notes. " +
                "These are some notes. This is even a lot of notes. These are some notes. This is even a lot of notes."
            }];

        // inject the tax paid and total.
        angular.forEach(orders, function (order) {
            order.total = _.reduce(order.bill, function (total, lineItem) {
                return total + (lineItem.price ? lineItem.price : 0);
            }, 0);
            order.tax = order.total * .01;
        });

        orders = _.sortBy(orders, ['dateOfSale', 'id']).reverse();
        $scope.orders = orders;

        var mostRecentOrder = _.first(orders);
        var secondMostRecentOrder = _.first(_.at(orders, 1));
        $scope.viewPriorPrescription = false;
        $scope.mostRecentAddress = mostRecentOrder.information;
        $scope.mostRecentPrescription = mostRecentOrder.prescription;
        $scope.priorPrescription = secondMostRecentOrder ? secondMostRecentOrder.prescription : null;

        $scope.changeCurrentPrescription = function () {
            $scope.viewPriorPrescription = !$scope.viewPriorPrescription;
        };
    }]);