"use strict";

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

// specify the path to the "public" namespace
app.use(express.static(path.join(__dirname, "public")));

// Allow cross domain calling
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE");
    res.header("Allow", "OPTIONS, POST, PUT");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

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

// configure logging
var morgan = require('morgan');
app.use(morgan(process.env.LOGOUTPUT));

// parse application/json && application/x-www-form-urlencoded
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// configure database
//require('./database')(app);
//app.use(app.middleware.addDbToRequest);

// wire up the sub-path for swagger api
//var subpath = express();
//app.use("/contentplayer/v1", subpath)

// wire up swagger for API calls (using a sub-path of contentplayer/v1)
//var swagger = require('swagger-node-express');
//swagger.setAppHandler(subpath);
//swagger.configureSwaggerPaths("", "/api-docs", "");
//swagger.configure(process.env.API, "1.0");

// start listening for requests on the configured port
app.listen(app.get('port'));

app.use("/", function (req, res, next) {
    res.render('index', { title: 'Whalen Optical' });
});