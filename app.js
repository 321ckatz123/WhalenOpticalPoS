"use strict";

var http = require('http');
var path = require('path');
var Rollbar = require('rollbar');
var rollbar = new Rollbar({
  accessToken: 'c6ad4dacb8a14857ac0aa0ec8fbd7e2a',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// load the configuration
require('dotenv').config()

// start express and have it listen to a particular port, specified in the config
var express = require('express');
var app = express();
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('title', 'Whalen Optical');

// specify the favicon
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

// add in mongo for db access
require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/WhalenOpticalPoS');
app.use(function(req,res,next){
    req.db = db;
    next();
});

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

app.use(rollbar.errorHandler());