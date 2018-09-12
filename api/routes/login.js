const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/userModel');

router.get("/", (req, res) => {

    res.sendFile('home.html', {
        root: "./"
    });
});

router.post("/", (req, res, next) => {
    const user = new User({
        "_id": new mongoose.Types.ObjectId(),
        "user": req.body.username,
        "email": req.body.email,
        "password": req.body.password
    });
    user.save().then(result => {
            console.log(result);
            res.sendStatus(201);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;