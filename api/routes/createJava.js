var Docker = require('dockerode');
const express = require('express');
const router = express.Router();


var docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

function installJava(container) {

    var options = {
        Cmd: ['bash', '-c', "apt update && apt full-upgrade -y && apt install default-jdk -y"],
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
    return;
}

function helloWorld() {
    docker.run('ubuntu')

}

function moveSubmission(submissionName, containerName) {
    container = docker.getContainer(containerName);
    console.log(container.id);

};

function newJava() {
    docker.createContainer({
        Image: 'ubuntu',
        name: 'java',
        Tty: true,
        Cmd: ['/bin/bash']
    }, function (err, container) {
        container.start({}, function (err, data) {
            installJava(container);
        });
    });
}

router.post('/java', (req, res, next) => {

    newJava();

    next(
        res.send('Loading...')
    );
});

router.get('/:containerName', (req, res, next) => {
    const name = req.params.containerName;
    docker.getContainer(name).inspect(function (err, data) {
        res.send(data);
    });
});

module.exports = router;