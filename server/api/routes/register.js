const express = require('express');
const DB = require('../../db')
const db = new DB('sqlite3')
const config = require('../../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

function checkInsert(err) {

}


router.post('/', (req, res) => {
    console.log("POST to /")
    db.insert([
            req.body.name,
            req.body.email,
            bcrypt.hashSync(req.body.password, 8)
        ],
        function (err) {
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
