const express = require('express');
const db = require('../../app')
const config = require('../../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

function success(boolean) {
    console.log(boolean)
}

router.post('/', (req, res, next) => {
    console.log("POST to login")
    db.db.selectByEmail(req.body.email, (err, user) => {
        console.log('selectByEmail')
        if (err) {
            console.log(err)
            return res.status(500).send('Error on the server.')
        }
        if (!user) return res.status(404).send('No user found.');
        let passwordIsValid = bcrypt.compareSync(userPass, user.user_pass);
        if (!passwordIsValid) return res.status(401).send({
            auth: false,
            token: null
        })
        let token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: 86400
        })
        res.status(200).send({
            auth: true,
            token: token,
            user: user
        })
    })
})

module.exports = router
