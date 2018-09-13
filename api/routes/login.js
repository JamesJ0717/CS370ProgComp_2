const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const alert = require('alert-node');

const User = require('../models/Users');

router.post("/", (req, res, next) => {
    User.findOne({
            email: req.body.email,
            password: req.body.password
        }).exec().then(docs => {
            console.log(docs);
            if (docs == null) {
                console.log('error');
                alert('Invalid details. Please try again', 'msg');
                res.sendFile('index.html', {
                    root: './'
                });
            } else if (docs != null) {
                res.sendFile('home.html', {
                    root: './'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/list', (req, res, next) => {
    User.find().exec().then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/createAccount", (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    });
    user.save().then(result => {
            console.log(result);
            res.sendFile('home.html', {
                root: './'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;