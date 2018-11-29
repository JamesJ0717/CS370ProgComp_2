const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const loginRoute = require('./api/routes/login');
const fileDemo = require('./api/routes/fileupload');
const registerRoute = require('./api/routes/register')
const addComp = require('./api/routes/addComp')
const getComps = require('./api/routes/getCompetitions')

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

// use login for requests to /login
app.use('/login', loginRoute);
// use fileupload for requests to /fileupload
app.use('/fileupload', fileDemo);
// use register for requests to /register
app.use('/register', registerRoute);
// use addComp for requests to /addComp
app.use('/addComp', addComp)
//
app.use('/getCompetitions', getComps)

app.use('', (req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    res.sendFile('public/images/confer404.jpg', {
        root: './',
    });
    // next(error);
});

module.exports = {
    app
};
