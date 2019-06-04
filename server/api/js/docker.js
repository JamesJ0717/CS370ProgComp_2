const Docker = require('dockerode')
const fs = require('fs')
const path = require('path')

var docker = new Docker({
    socketPath: '/var/run/docker.sock'
})

/**
 *Creates a docker volume
 *@param callback
 *@return void
 */
function createVolume(callback) {
    return docker.createVolume({
        Labels: {}
    }, (err, volume) => {
        if (err) {
            console.log(err)
        }
        console.log(volume.name)
        callback(volume);
        //    volume.remove({}).then(() => {console.log("REMOVED")});
    })
}

/**
 * Determines the image based on the extension of the file passed
 * @param {*} filename
 * @returns image
 */
function imageForFile(filename) {
    ext = filename.split('.').pop()
    switch (ext) {
        case 'java':
            return 'openjdk:alpine'
        case 'py':
            return 'python:alpine'
        default:
            console.error('File extension not recognized: ' + ext)
    }
}

/**
 * Creates a container based on the image passed
 * @param {*} image
 * @param {*} binds
 * @param {*} callback
 */
function createContainer(image, binds, callback) {
    docker.pull(image);
    docker.createContainer({
            Image: image,
            Tty: true,
            Binds: binds
        },
        function (err, container) {
            if (err) {
                return console.log(err)
            }
            container.start({}, (err, data) => {
                callback(container);
                container.stop({}).then((c) => {
                    return c.remove({})
                });
            })
        }
    )
}

/**
 * Runs a command in the container passed in
 * @param {*} container
 * @param {*} cmd
 * @param {*} callback
 */
function execute(container, cmd, callback = null) {
    container.exec({
            Cmd: ['sh', '-c', cmd],
            AttachStdout: callback != null,
            AttachStderr: callback != null
        },
        function (err, exec) {
            exec.start(function (err, stream) {
                if (callback) {
                    var result = ''
                    stream.on('data', function (chunk) {
                        result += Buffer([...chunk].slice(8)).toString('utf8') // the first byte is not wanted
                    })

                    stream.on('end', function () {
                        callback(result.trim())
                    })
                }
                /*
                    exec.inspect(function (err, data) {                  Code which will be used later to get PID
                        if (err) return;
                        console.log(data);
                    }); */
            })
        }
    )
}

/**
 * Compiles or runs the code that's passed in
 * @param {*} inputFile the input for the submission
 * @param {*} codeFile submission file
 * @param {*} outputFile where to output the output from the code
 */
function runCodeCmd(inputFile, codeFile, outputFile) {
    var parts = codeFile.split('.')
    var ext = parts.pop()
    var name = parts.pop()
    // console.log(codeFile)

    switch (ext) {
        case 'java':
            var s = 'javac ' + name + '.java && java ' + name
            if (inputFile) s += ' < ' + inputFile
            if (outputFile) s += ' > ' + outputFile

            return s
        case 'py':
            var s = 'python ' + name + '.py'
            if (inputFile) s += ' < ' + inputFile
            if (outputFile) s += ' > ' + outputFile

            return s
        default:
            console.error('File extension not recognized: ' + ext)
    }
}

/**
 * Runs the generation file
 * @param {*} genFile
 * @param {*} volG
 * @param {*} callback
 */
function runGenFile(genFile, volG, callback) {
    filename = path.basename(genFile);
    // console.log(filename)
    binds = [
        volG.name + ':/generated',
        fs.realpathSync(genFile, []) + ':/' + filename + ':ro'
    ]
    createContainer(imageForFile(filename), binds, cont => {
        execute(cont, runCodeCmd(null, filename, 'generated/file.txt'), callback)
    })
}

function runSubFile(subFile, volG, volS, callback) {
    filename = path.basename(subFile);
    // console.log(filename)
    binds = [
        volG.name + ':/generated:ro',
        volS.name + ':/output',
        fs.realpathSync(subFile, []) + ':/' + filename + ':ro'
    ]
    createContainer(imageForFile(filename), binds, cont => {
        execute(cont, '/usr/bin/time -f "%S %M" -o output/stats.txt ' + runCodeCmd('generated/file.txt', filename, 'output/file.txt'), callback)
    })
}

function runEvalFile(evalFile, volG, volS, callback) {
    filename = path.basename(evalFile);
    // console.log(filename)
    binds = [
        volG.name + ':/generated:ro',
        volS.name + ':/output:ro',
        fs.realpathSync(evalFile, []) + ':/' + filename + ':ro'
    ]
    createContainer(imageForFile(filename), binds, cont => {
        execute(cont, runCodeCmd(null, filename, null), callback)
    })
}

function fullRun(genFile, subFile, evalFile, callback) {
    console.log("Starting Full Run...")

    createVolume(volG => {
        createVolume(volS => {
            runGenFile(genFile, volG, (txt) => {
                if (txt != "") {
                    callback("An error occurred while running the Gen file: " + txt)
                    return
                }
                runSubFile(subFile, volG, volS, (txt) => {
                    if (txt != "") {
                        callback("An error occurred while compiling and running the submission: " + txt)
                        return
                    }

                    runEvalFile(evalFile, volG, volS, callback)
                })
            })
        })
    })
}

// docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" -a   ---list all current containers, with memory and cpu usage---
// docker stop $(docker container ls -q) && docker rm $(docker container ls -aq)  ---to remove all docker containers---
// docker volume rm $(docker volume list -q)   ---to remove all docker volumes---
// wc -c shared/Submission.java | grep -o -m 1 "[[:digit:]]*

// fullRun('java/example/path/Generation_Pluck_Drop_Specific.py',
//         'java/example/path/Submission_Pluck_Drop_Specific.java',
//         'java/example/path/Evaluation_Pluck_Drop.java', result => {
//   console.log("-------------- RESULT -------------")
//   console.log(result)
//   console.log("-----------------------------------")
// })

module.exports = {
    fullRun
}
