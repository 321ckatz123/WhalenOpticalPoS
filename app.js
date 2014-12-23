"use strict";

var http = require('http');
var path = require('path');

// load the configuration
var dotenv = require('dotenv');
dotenv.load();

// start express and have it listen to a particular port, specified in the config
var express = require('express');
var app = express();
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('title', 'Whalen Optical');

// specify the favicon
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

// configure error handling
app.use(function (err, req, res, next) {
    var code = err.status || err.code || 500;
    console.log('err', err, code, err.message);

    // respond in JSON that something went wrong
    res.json(code, {
        code: code,
        message: err.message
    });
});

// parse application/json && application/x-www-form-urlencoded
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// start listening for requests on the configured port
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

require("./routes")(express, app);