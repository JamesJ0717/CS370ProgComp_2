var Docker = require('dockerode');
const express = require('express');

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

}

function runCommand(container, cmd, callback = null) {

    var opts = {
        Cmd: cmd,
        AttachStdout: callback != null,
        AttachStderr: callback != null
    };
    //      wc -c text2.txt | grep -o --color=never -m 1 "[[:digit:]]*"   code to extract the first number from a file
    container.exec(opts, function (err, exec) {
        if (err) {
            console.log("1 Error in runCommand:");
            console.log(err);
            return;
        }

        exec.start(function (err, stream) {
            if (err) {
                console.log("2 Error in runCommand:");
                console.log(err);
                return;
            }

            if (callback) {
                var result = '';
                stream.on('data', function (chunk) {
                    result += Buffer([...chunk].slice(8)).toString('utf8'); // the first byte is not wanted
                });

                stream.on('end', function () {
                    callback(result);
                });
            }

            /*            if (options.output == "print") {
                        	container.modem.demuxStream(stream, process.stdout, process.stderr);
                        }*/

            /*            exec.inspect(function (err, data) {                  Code which will be used later to get PID
                            if (err) return;
                            console.log(data);
                        }); */
        });
    });

    return;
}

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

function newJava(filePath, tar) {
    var volumeName = null;
    docker.createVolume({
        "Labels": {}
    }, function (err, volume) {
        volumeName = volume.name;
        console.log("Volume created: " + volumeName);
    });

    docker.createContainer({
        Image: 'openjdk:alpine',
        Tty: true,
        // Cmd: ['']
    }, function (err, container) {
        var containerName = container.id;
        console.log("Container created: " + containerName);
        container.start(function (err, data) {
            // container.putArchive(tar).catch(console.log('err'));
            console.log('Container Started: ' + containerName + '\n');
            // console.log(data + '\n');

            setTimeout(function () {
                console.log('hi')
                runJava(container);
            }, 5000);
        })
    });
}

function runJava(container) {

    runCommand
}

function runPython(container) {

    runCommand(container, ['python', 'shared/Submission.py'], (result) => {
        console.log(result);
    });

    return;
}

function newPython(filePath) {
    var volumeName = null;
    docker.createVolume({
        "Labels": {}
    }, function (err, volume) {
        volumeName = volume.name;
        console.log("VOLUME CREATED: " + volumeName);
    });

    docker.createContainer({
        Image: 'python:alpine',
        Tty: true,
        Binds: [volumeName + ":/persisting", filePath + "Submission.py:/shared/Submission.py:ro"]
    }, function (err, container) {
        console.log("CONTAINER CREATED");
        container.start({}, function (err, data) {
            console.log("CONTAINER STARTED");
            runPython(container);
        });
    });
}

// router.get('/:teamName', (req, res, next) => {
//     var name = req.query.teamName;
//     console.log(name);
//     newContainer(name);

//     res.status(201).sendFile('home.html', {
//         root: './html/'
//     });
// });

// router.get('/:containerName', (req, res, next) => {
//     const name = req.query.containerName + '';
//     let container = docker.getContainer();
//     console.log(name + '');
//     let stuff = container.inspect();

//     setTimeout(function () {
//         console.log(stuff);

//         res.status(200).send(stuff);

//     }, 2000);
// });

// router.post('/list/all', (req, res, next) => {

//     var _id = [];
//     var i = 0;
//     docker.listContainers({
//         all: true
//     }, function (err, containers) {
//         containers.forEach(function (containerInfo) {
//             _id[i] = containerInfo.Names;
//             i++;
//         });
//     });

//     setTimeout(function () {
//         console.log(_id);

//         res.status(200).send(_id);
//     }, 2000);
// });

module.exports = {
    runCommand,
    runJava,
    runPython,
    newContainer,
    newJava,
    newPython
}