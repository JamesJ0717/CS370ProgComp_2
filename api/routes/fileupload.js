const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");

router.post('/', (req, res, next) => {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var oldpath = files.filetoupload.path;
		var newpath = '/Users/jamesjohnson/Desktop/School Stuff/CS370ProgComp_2/uploads/' + files.filetoupload.name;
		fs.rename(oldpath, newpath, function (err) {
			if (err) throw err;
			res.write('File uploaded');
			res.end();
		});
	});
});

router.get('/:fileID', (req, res, next) => {
	var name = req.params.fileID;

	res.sendFile('/Users/jamesjohnson/Desktop/School Stuff/CS370ProgComp_2/uploads/' + name);
});

router.get('/', (req, res, next) => {
	res.sendStatus(200);
});

module.exports = router;