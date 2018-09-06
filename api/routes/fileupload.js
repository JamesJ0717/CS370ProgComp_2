const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const formidable = require("formidable");
const fs = require("fs");

const File = require("../models/fileModel");

const db = require("../../app");

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
	const fileUpload = new File({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.filetoupload
	});
	fileUpload
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: fileUpload.name + " was uploaded.",
				id: fileUpload._id
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
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
