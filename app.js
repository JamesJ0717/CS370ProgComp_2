const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const fileUploadRoute = require('./api/routes/fileupload');
const loginRoute = require('./api/routes/login');
const arbitraryName = require('./api/routes/createJava');
const javaDemo = require('./api/routes/demojava');

mongoose.connect("mongodb+srv://admin:" +
    process.env.MONGO_ATLAS_PASSWD +
    "@cluster0-b8ovy.mongodb.net/cs370project?retryWrites=true", {
        useNewUrlParser: true
    });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/fileupload', fileUploadRoute);
// app.use('/login', loginRoute);
app.use('/execute', arbitraryName);
app.use('/demojava', javaDemo);

app.use('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;