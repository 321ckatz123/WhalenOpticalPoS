angular.module('app.controllers')
    .controller('IndexCtrl', ['$scope', function ($scope) {
        var orders = [{
            id: 1,
            dateOfSale: new Date("01/02/2014"),
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
            lens: {},
            frame: {},
            notes: "These are some notes. This is even a lot of notes. These are some notes. " +
            "This is even a lot of notes. These are some notes. This is even a lot of notes. " +
            "These are some notes. This is even a lot of notes. These are some notes. This is even a lot of notes."
        }];

        $scope.orders = orders;
        $scope.mostRecentOrder = _.max(orders, 'id');
    }]);