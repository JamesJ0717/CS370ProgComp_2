const express = require('express');
const DB = require('../../db')
const db = new DB('sqlite3')
const config = require('../../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/', (req, res, next) => {
    console.log("POST to login")
    let userPass = req.body.password
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) {
            console.log(err)
            return res.json({
                response: 'server'
            }).status(500)
        }
        if (!user) return res.json({
            auth: false,
            token: null,
            response: 'email'
        }).status(404)
        let passwordIsValid = bcrypt.compareSync(userPass, user.user_pass);
        if (!passwordIsValid) return res.json({
            auth: false,
            token: null,
            response: 'password'
        }).status(401)
        let token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: 86400
        })
        res.json({
            auth: true,
            token: token,
            response: 'good',
            user: user
        }).status(200)
    })
})

module.exports = router
