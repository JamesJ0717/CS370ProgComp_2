const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get("/", (req, res, next) => {
    res.sendStatus(200);
});

module.exports = router;