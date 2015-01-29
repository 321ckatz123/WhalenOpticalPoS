"use strict";

var path = require('path');
var _ = require('lodash');

module.exports = function (express, app) {
    // specify the path to the "public" namespace
    app.use(express.static(path.join(__dirname, ".dist")));

    app.get("/search/:fields?.:format?", function (req, res) {
        if (req.params.format) {
            var regex = new RegExp("^" + req.params.fields, 'i');
            var orders = req.db.get('orders');
            orders.find({
                "$or": [
                    {"fName": regex},
                    {"lName": regex}
                ]
            }, function (err, results) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    var returnValue = [];
                    for(var i = 0; i < results.length; i++) {
                        var result = results[i];

                        if (result.orders.length > 1) {
                            result.order = _.max(result.orders, 'dateOfSale');
                        }
                        else {
                            result.order = result.orders[0];
                        }

                        delete result.orders;
                        returnValue.push(result);
                    }

                    res.status(200).json(returnValue);
                }
            });
        }
        else {
            res.render('pages/results', {title: 'Whalen Optical'});
        }
    });

    app.post("/order/:personId?/:orderId?", function (req, res) {
        var orders = req.db.get('orders');
        orders.insert(req.body, function (err, doc) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send({id: doc._id});
            }
        });
    });

    app.get("/order/", function (req, res) {
        res.render('pages/person_create', {title: 'Whalen Optical'});
    });

    app.get("/person/:id.:format?", function (req, res) {
        if (req.params.format) {
            var orders = req.db.get('orders');
            orders.findOne({"_id": req.params.id},
                function (err, returnValue) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        res.status(200).json(returnValue);
                    }
                });
        }
        else {
            res.render('pages/person', {title: 'Whalen Optical'});
        }
    });

    app.use("/", function (req, res) {
        res.render('pages/index', {title: 'Whalen Optical'});
    });
};