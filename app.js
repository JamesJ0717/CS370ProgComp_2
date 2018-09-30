const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const passport = require('passport');

const loginRoute = require('./api/routes/login');
const fileDemo = require('./api/routes/fileupload');

// connecting to mongodb atlas database
mongoose.connect('mongodb+srv://admin:cs370password@cluster0-b8ovy.mongodb.net/cs370project?retryWrites=true', {
    useNewUrlParser: true,
});

// set the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// secure password handling
app.use(passport.initialize());
app.use(passport.session());

// console output color coded for developing
app.use(morgan('dev'));

// allow the rest of the files to be able to read the body of requests
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());

// header control
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// static routes for static files
app.use('/html', express.static(__dirname + '/html'));
app.use('/html/styles', express.static(__dirname + '/html/styles'));
app.use('/public/images', express.static(__dirname + '/public/images'));

// use login for requests to /login
app.use('/login', loginRoute);
// use fileupload for requests to /fileupload
app.use('/fileupload', fileDemo);

// use signup for requests to /login/signup
app.use('/login/signup', (req, res) => {
    res.sendFile('html/signup.html', {
        root: './',
    });
});

// display home.html when nothing else is in the url
app.use('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: './',
    });
});

app.use('', (req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    res.sendFile('public/images/confer404.jpg', {
        root: './',
    });
    // next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.write(
        '<h1 style="text-align: center">Oops!</h1>' +
        '<p> </p>' +
        '<img src="public/images/confer_forbidden.jpg">' +
        '<style> body { text-align: center }</style>'
    );
    res.end();
});


module.exports = app;