const express = require('express')
const mongoose = require('mongoose')
const alert = require('alert-node')

const router = express.Router()
const User = require('../models/Users')

router.post('/', (req, res, next) => {
    User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        .exec()
        .then((docs) => {
            console.log(docs)
            if (docs == null) {
                console.log('error')
                // alert('Invalid details. Please try again', 'msg')
                res.redirect('./index.html')
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
                const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: req.body.password,
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