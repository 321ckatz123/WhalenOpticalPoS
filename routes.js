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
                    for (var i = 0; i < results.length; i++) {
                        var result = results[i];

                        if (result.orders.length > 1) {
                            result.order = _.max(result.orders, 'id');
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

    app.delete("/order/:personId/:orderId", function (req, res) {
        var orders = req.db.get('orders');
        orders.findOne({"_id": req.params.personId},
            function (err, person) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    // if this is the only order, delete the person record
                    if (person.orders.length === 1) {
                        orders.remove({"_id": req.params.personId}, function (err) {
                            if (err) {
                                res.status(500).send(err);
                            }
                            else {
                                res.sendStatus(200);
                            }
                        });
                    }
                    // otherwise, just remove the order from the array
                    else {
                        orders.update({"_id": req.params.personId},
                            {
                                "$pull": {orders: {"id": parseInt(req.params.orderId)}}
                            }, function (err) {
                            if (err) {
                                res.status(500).send(err);
                            }
                            else {
                                res.sendStatus(200);
                            }
                        });
                    }
                }
            });
    });

    app.post("/order/:personId?/:orderId?", function (req, res) {
        var orders = req.db.get('orders');
        // if this is updating an existing order
        if (req.params.orderId) {
            orders.update({"_id": req.params.personId},
                {
                    "$pull": {orders: {"id": parseInt(req.params.orderId)}}
                },
                function (err) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        orders.update({"_id": req.params.personId},
                            {
                                "$set": {
                                    "fName": req.body.fName,
                                    "lName": req.body.lName
                                },
                                "$push": {orders: req.body.orders[0]}
                            },
                            function (err) {
                                if (err) {
                                    res.status(500).send(err);
                                }
                                else {
                                    res.status(200).send({id: req.params.personId});
                                }
                            });
                    }
                });
        }
        // if this is adding a new order to an existing person
        else if (req.params.personId) {
            orders.update({"_id": req.params.personId},
                {
                    "$set": {
                        "fName": req.body.fName,
                        "lName": req.body.lName
                    },
                    "$push": {orders: req.body.orders[0]}
                },
                function (err) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        res.status(200).send({id: req.params.personId});
                    }
                });
        }
        else {
            orders.insert(req.body, function (err, doc) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(200).send({id: doc._id});
                }
            });
        }
    });

    app.get("/order/:personId/:orderId.json", function (req, res) {
        var orders = req.db.get('orders');
        orders.findOne({"_id": req.params.personId},
            function (err, returnValue) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    if (returnValue.orders.length > 1) {
                        returnValue.order = _.find(returnValue.orders, function (order) {
                            return order.id.toString() === req.params.orderId;
                        });
                    }
                    else {
                        returnValue.order = returnValue.orders[0];
                    }

                    delete returnValue.orders;
                    res.status(200).json(returnValue);
                }
            });
    });

    app.get("/order/:personId.json", function (req, res) {
        var orders = req.db.get('orders');
        orders.findOne({"_id": req.params.personId},
            function (err, returnValue) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    if (returnValue.orders.length > 1) {
                        returnValue.order = _.max(returnValue.orders, 'id');
                    }
                    else {
                        returnValue.order = returnValue.orders[0];
                    }

                    delete returnValue.orders;
                    res.status(200).json(returnValue);
                }
            });
    });

    app.get("/order/:personId?/:orderId?", function (req, res) {
        res.render('pages/person_create', {title: 'Whalen Optical'});
    });

    app.get("/frame/:personId.json", function (req, res) {
        var orders = req.db.get('orders');
        orders.findOne({"_id": req.params.personId},
            function (err, returnValue) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    var existingFrames = _.pluck(returnValue.orders, 'frame');
                    _.remove(existingFrames, function(frame) { return !frame; });
                    if(existingFrames) {
                        res.status(200).json( _.uniq(existingFrames));
                    }
                    else {
                        res.sendStatus(200);
                    }
                }
            });
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