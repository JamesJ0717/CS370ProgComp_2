const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload');

const File = require("../models/fileModel");

router.use(fileUpload());

router.get("/", (req, res, next) => {
	res.sendStatus(200);
});

router.post("/", (req, res, next) => {
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	var filetoupload = req.files.filetoupload;

	filetoupload.mv('/Users/jamesjohnson/Desktop/School Stuff/CS370ProgComp_2/uploads/' + filetoupload.name, function (err) {
		if (err) {
			console.log(err);
			return res.status(500);
		}
	});

	res.send(filetoupload.name + ' uploaded!');
});

module.exports = router;