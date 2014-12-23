"use strict";

var path = require('path');

module.exports = function(express, app) {
    // specify the path to the "public" namespace
    app.use(express.static(path.join(__dirname, ".dist")));

    app.get("/search/:fields", function (req, res, next) {
        res.render('pages/results', {title: 'Whalen Optical'});
    });

    app.get("/person/new", function (req, res, next) {
        res.render('pages/person_create', {title: 'Whalen Optical'});
    });

    app.get("/person/:id", function (req, res, next) {
        res.render('pages/person', {title: 'Whalen Optical'});
    });

    app.use("/", function (req, res, next) {
        res.render('pages/index', {title: 'Whalen Optical'});
    });
};