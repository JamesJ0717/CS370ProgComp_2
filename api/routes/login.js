const express = require('express');
const mongoose = require('mongoose');
const sha256 = require('js-sha256')

const router = express.Router()
const User = require('../models/Users')

router.post('/', (req, res, next) => {
    let userPass = sha256(req.body.password)
    User.findOne({
            email: req.body.email,
            password: userPass
        })
        .exec()
        .then((docs) => {
            console.log(docs)
            if (docs == null) {
                console.log('error')
                // popup.window('Failure')
                res.redirect('./index.html')
                return ({
                    success: false
                })
            } else if (docs != null) {
                if (docs.group == 'Host') {
                    res.sendFile('/hostHome.html', {
                        root: './html'
                    })
                } else if (docs.group == 'Team') {
                    res.sendFile('/home.html', {
                        root: './html'
                    })
                } else {
                    res.redirect('./index.html')
                }
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err,
            })
        })
})

router.post('/createAccount', (req, res, next) => {
    User.findOne({
            email: req.body.email,
        })
        .exec()
        .then((docs) => {
            // if the email exists
            if (docs != null) {
                console.log(docs)
                console.log('Email found')
                // alert('Account with that email already exists')
                res.sendFile('/signup.html', {
                    root: './html',
                })
                // if the email does not exist
            } else {
                // mongodb user schema
                let shadPass = sha256(req.body.password)
                const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: shadPass,
                        group: req.body.group
                    })
                    .save()
                    .then((result) => {
                        console.log(result)
                        if (result.group == 'Host') {
                            res.sendFile('/hostHome.html', {
                                root: './html'
                            })
                        } else if (result.group == 'Team') {
                            res.sendFile('/home.html', {
                                root: './html'
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            error: err,
                        })
                    })
            }
        })
})

module.exports = router