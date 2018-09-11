var Docker = require('dockerode');
const express = require('express');
const router = express.Router();


var docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

function aptUpdate(container) {

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

function newJava() {
    docker.createContainer({
        Image: 'ubuntu',
        // name: 'java',
        Tty: true,
        Cmd: ['/bin/bash']
    }, function (err, container) {
        container.start({}, function (err, data) {
            aptUpdate(container);
        });
    });
}

router.get('/', (req, res, next) => {
    newJava();

    res.send('Loading')
});

module.exports = router;