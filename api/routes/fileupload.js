const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const alert = require('alert-node');

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

router.post("/", (req, res, next) => {
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	var filetoupload = req.files.filetoupload;

	filetoupload.mv('uploads/' + filetoupload.name, function (err) {
		if (err) {
			console.log(err);
			return res.status(500);
		}
		var message = filetoupload.name + ' uploaded!';
		console.log(message);
		alert('File uploaded', 'msg');
	});
	res.sendFile('/home.html', {
		root: './html/'
	})
});

module.exports = router;