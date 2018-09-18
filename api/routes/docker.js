var Docker = require('dockerode');
const express = require('express');
const router = express.Router();


var docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

function update(container) {

    var options = {
        Cmd: ['bash', '-c', 'python3.6 print("hi)'],
        AttachStdout: true,
        AttachStderr: true
    };

    container.exec(options, function (err, exec) {
        if (err) return;
        exec.start(function (err, stream) {
            if (err) return;

            container.modem.demuxStream(stream, process.stdout, process.stderr);

            exec.inspect(function (err, data) {
                if (err) return;
                console.log(data);
            });

        });
    });

}

function moveSubmission(submissionName, containerName) {
    container = docker.getContainer(containerName);
    console.log(container.id);

};

function newContainer(name) {
    const containerName = name + '';
    console.log(containerName);
    if (containerName != null) {
        docker.createContainer({
            Image: 'ubuntu',
            name: containerName,
            Tty: true,
            Cmd: ['/bin/bash']
        }).then(function (container) {
            console.log('created')
            return container.start();
        });
    } else {
        console.log('name undefined')
    }
}

router.post('/team', (req, res, next) => {
    var name = req.body.teamName;
    console.log(name);
    newContainer(name);

    res.status(201).sendFile('home.html', {
        root: './html/'
    });
});

router.get('/:containerName', (req, res, next) => {
    const name = req.query.containerName + '';
    let container = docker.getContainer(name);
    console.log(name + '');
    let stuff = container.inspect();

    setTimeout(function () {
        console.log(stuff);

        res.status(200).send(stuff);

    }, 2000);
});

router.post('/list/all', (req, res, next) => {

    var _id = [];
    var i = 0;
    docker.listContainers({
        all: true
    }, function (err, containers) {
        containers.forEach(function (containerInfo) {
            _id[i] = containerInfo.Names;
            i++;
        });
    });

    setTimeout(function () {
        console.log(_id);

        res.status(200).send(_id);
    }, 2000);
});
module.exports = router;