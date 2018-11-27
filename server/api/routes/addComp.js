const express = require('express');
const DB = require('../../db')
const db = new DB('sqlite3')

const router = express.Router()

router.post('/', (req, res) => {
    console.log('POST to /')
    console.log(req.body)
    db.createCompetition([
        req.body.name,
        req.body.question,
        req.body.start,
        req.body.end
    ], (err) => {
        if (err) {
            console.log('Name error')
            return res.json({
                message: 'Internal Server Error',
                cause: 'name'
            }).status(500)
        }
        db.selectByName(req.body.name, (err, comp) => {
            if (err) return res.status(409).send('There is already a competition with that name.')
            res.status(200).json({
                created: true,
                comp: comp
            })
        })
    })
})

module.exports = router
