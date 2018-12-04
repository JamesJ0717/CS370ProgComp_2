const express = require('express')
const DB = require('../../db')
const db = new DB('sqlite3')

const router = express.Router()

router.get('/', (req, res) => {
    db.selectAllScores((err, row) => {
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

module.exports = router
