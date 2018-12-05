const express = require('express');
const DB = require('../../db')
const db = new DB('sqlite3')

const router = express.Router()

router.get('/', (req, res) => {
    db.selectAllComps((err, row) => {
        if (err) {
            console.log(err)
            return res.json({
                response: 'Server Error'
            }).status(500)
        }
        if (row.length == 0) {
            return res.json({
                cause: 'empty'
            }).status(404)
        }
        res.json({
            data: row,
            number: parseInt(row.length)
        }).status(200)
    })
})

router.get('/mine/:creator', (req, res) => {
    db.getMyComps(req.query.creator, (err, row) => {
        if (err) {
            console.log(err)
            return res.json({
                response: 'Server Error'
            }).status(500)
        }
        if (row.length === 0) {
            console.log('Empty')
            return res.json({
                reason: 'empty'
            }).status(404)
        }
        res.json({
            data: row,
            number: parseInt(row.length)
        }).status(200)
    })
})

module.exports = router
