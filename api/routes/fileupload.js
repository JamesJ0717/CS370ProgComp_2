const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload');

const File = require("../models/fileModel");

router.use(fileUpload());

router.get("/", (req, res, next) => {
	File.find()
		.exec()
		.then(docs => {
			console.log(docs);
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.get("/:fileID", (req, res, next) => {
	const id = req.params.fileID;
	File.findById({
			_id: id
		})
		.exec()
		.then(docs => {
			console.log(docs);
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
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

router.delete("/:fileID", (req, res, next) => {
	const id = req.params.fileID;
	File.remove({
			_id: id
		})
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

module.exports = router;