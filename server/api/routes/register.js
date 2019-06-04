const express = require('express');
const DB = require('../../db')
const db = new DB('sqlite3')
const config = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/', (req, res) => {
    console.log("POST to /")
    db.insert([
            req.body.name,
            req.body.email,
            bcrypt.hashSync(req.body.password, 8),
            req.body.is_host
        ],
        function (err) {
            if (err) {
                console.log(err)
                return res.json({
                    message: "There was a problem registering the user.",
                    cause: 'email'
                }).status(500)
            }
            db.selectByEmail(req.body.email, (err, user) => {
                if (err) return res.status(500).send("There was a problem getting the user.")
                let token = jwt.sign({
                    id: user.id
                }, config.secret, {
                    expiresIn: 86400
                });
                res.status(200).send({
                    auth: true,
                    token: token,
                    user: user
                })
            })
        })
})

router.post('/admin', (req, res) => {
    console.log("POST to /admin")
    db.insertAdmin([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        1
    ], function (err) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        db.selectByEmail(req.body.email, (err, user) => {
            if (err) return res.status(500).send("There was a problem getting the user.")
            let token = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: 86400
            });
            res.status(200).send({
                auth: true,
                token: token,
                user: user
            })
        })
    })
})

module.exports = router
