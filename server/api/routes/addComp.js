const express = require('express');
const DB = require('../../db')
const db = new DB('sqlite3')
const fs = require('fs')

const router = express.Router()

router.post('/', (req, res) => {
    console.log('POST to addComp')
    console.log(req.body)
    db.createCompetition([
        req.body.name,
        req.body.question,
        req.body.creator,
        req.body.startDate,
        req.body.endDate
    ], (err) => {
        if (err) {
            console.log(err)
            return res.json({
                message: 'Internal Server Error',
                status: 500
            }).status(500)
        }
        db.selectByName(req.body.name, (err, comp) => {
            if (err) return res.status(409).send('There is already a competition with that name.')
            fs.mkdirSync('uploads/competitions/' + req.body.name)
            res.json({
                created: true,
                comp: comp,
                status: 200
            }).status(200)
        })
    })
})

module.exports = router
