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
app.use(require('connect-flash')());

// configure express sessions
var session = require('express-session');
app.use(session({secret: process.env.s, resave: true, saveUninitialized: true}));

// specify the path to the "public" namespace
app.use(express.static(path.join(__dirname, ".dist")));

// Allow cross domain calling
//app.all('/*', function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE");
//    res.header("Allow", "OPTIONS, POST, PUT");
//    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//    next();
//});

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
app.use(bodyParser.urlencoded({extended: true}));

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// configure security
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        if (username !== process.env.u) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        if (password !== process.env.p) {
            return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, {username: username, password: password});
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (id, done) {
    if (id === process.env.u) {
        return done(null, {username: process.env.u, password: process.env.p});
    }
    done(new Error('Username not found'), null);
});

app.use(passport.initialize());
app.use(passport.session());

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
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// routes
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.get("/login", function (req, res, next) {
    res.render('login', {title: 'Whalen Optical'});
});

app.use("/", function (req, res, next) {
    //if (req.user) {
    //    res.render('index', {title: 'Whalen Optical'});
    //}
    //res.redirect('/login');
    res.render('pages/index', {title: 'Whalen Optical'});
});