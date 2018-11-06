const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const alert = require('alert-node');
const docker = require('../js/docker');
const home = '../../html/home.html';
const hostHome = '../../html/hostHome.html';
const fs = require('fs');

const SIZELIMIT = 5240000;

router.use(fileUpload());

router.post('/', (req, res, next) => {
    if (!req.files) {
        alert('No files were uploaded.');
        return res.status(400);
    }

    let filetoupload = req.files.filetoupload;
    let fileName = filetoupload.name;
    let fileExt = fileName.split('.').pop();
    let filePath = 'uploads/' + fileName;
    let fileSize = req.headers['content-length'];

    console.log(fileName);
    console.log(fileExt);
    // console.log(filePath);
    // console.log(fileSize + ' bytes');

    if (fileExt === 'py' || fileExt === 'java') {
        if (fileSize > SIZELIMIT) {
            alert(
                'FILE TOO BIG! \nplease upload a file less than ' +
                SIZELIMIT / 1000000 +
                ' megabytes',
            );
            res.redirect(home);
        } else if (fileSize < SIZELIMIT) {
            filetoupload.mv(filePath, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500);
                }
                let message = filetoupload.name + ' uploaded!';
                console.log(message);
                // alert('File Uploaded!');
            });

            docker.fullRun(
                'java/example/path/Generation.py',
                filePath,
                'java/example/path/Evaluation.java',
                result => {
                    // alert(result);
                    console.log(result)
                },
            );

            res.status(200).redirect(home);
        }
    } else {
        // alert('Not accepted')
        console.log('Not accepted')
        res.status(404).redirect(home)
    }
});

router.post('/question', (req, res, next) => {
    if (!req.files) {
        alert('No files were uploaded.');
        return res.status(400);
    }

    let filetoupload = req.files.filetoupload;
    let fileName = filetoupload.name;
    let fileExt = fileName.split('.').pop();
    let filePath = 'uploads/questions/' + fileName;
    let fileSize = req.headers['content-length'];

    console.log(fileName);
    console.log(fileExt);
    console.log(filePath);
    console.log(fileSize + ' bytes');

    if (fileExt != 'py') {
        alert('Not accepted')
        return res.send(202)
    }

    if (fileSize > SIZELIMIT) {
        alert(
            'FILE TO BIG! \nplease upload a file less than ' +
            SIZELIMIT / 1000000 +
            ' megabytes',
        );
        res.sendFile('/hostHome.html', {
            root: './html',
        });
    } else if (fileSize < SIZELIMIT) {
        filetoupload.mv(filePath, function (err) {
            if (err) {
                console.log(err);
                return res.status(500);
            }
            let message = filetoupload.name + ' uploaded!';
            console.log(message);
            alert('File Uploaded!');
        });

        res.sendFile('/hostHome.html', {
            root: './html',
        });
    }

});

module.exports = router;