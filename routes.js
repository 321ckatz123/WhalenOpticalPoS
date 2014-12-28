"use strict";

var path = require('path');

module.exports = function (express, app) {
    // specify the path to the "public" namespace
    app.use(express.static(path.join(__dirname, ".dist")));

    app.get("/person/search/:fields.:format?", function (req, res) {
        if (req.params.format) {
            res.json(tempSearch);
        }
        else {
            res.render('pages/results', {title: 'Whalen Optical'});
        }
    });

    app.get("/person/search/", function (req, res) {
        res.render('pages/results', {title: 'Whalen Optical'});
    });

    app.get("/person/new", function (req, res) {
        res.render('pages/person_create', {title: 'Whalen Optical'});
    });

    app.get("/person/:id.:format?", function (req, res) {
        if (req.params.format) {
            res.json(tempPeople);
        }
        else {
            res.render('pages/person', {title: 'Whalen Optical'});
        }
    });

    app.use("/", function (req, res) {
        res.render('pages/index', {title: 'Whalen Optical'});
    });
};

var tempSearch = [
    {
        id: 1,
        dateOfLastSale: new Date("01/02/2014"),
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
        }
    },
    {
        id: 2,
        dateOfLastSale: new Date("01/06/2014"),
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
        }
    },
    {
        id: 3,
        dateOfLastSale: new Date("01/10/2014"),
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
        }
    }];

var tempOrders = [{
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

var tempPeople =
{
    id: 1,
    firstName: "Trevor",
    lastName: "Hawke",
    dateOfLastSale: new Date("01/02/2014"),
    orders: tempOrders
};