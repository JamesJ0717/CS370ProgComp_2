const Docker = require('dockerode')
const fs = require('fs')

var docker = new Docker({
  socketPath: '/var/run/docker.sock'
})

/**
 *Creates a docker volume
 *@param callback
 *@return void
 */
function createVolume(callback) {
  return docker.createVolume( { Labels: {} }, (err, volume) => {
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
  docker.createContainer({
      Image: image,
      Tty: true,
      Binds: binds
    },
    function (err, container) {
      container.start({}, (err, data) => {
        callback(container);
        container.stop({}).then((c) => { return c.remove({})});
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
            result += /*Buffer([...chunk].slice(8))*/chunk.toString('utf8') // the first byte is not wanted
          })

          stream.on('end', function () {
            callback(result)
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

  switch (ext) {
    case 'java':
      var s = 'javac ' + name + '.java && java ' + name
      if (inputFile) s += ' < ' + inputFile
      s += ' > ' + outputFile

      return s
    case 'py':
      var s = 'python ' + name + '.py'
      if (inputFile) s += ' < ' + inputFile
      s += ' > ' + outputFile

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
  binds = [
    volG.name + ':/generated',
    fs.realpathSync(genFile, []) + ':/' + genFile + ':ro'
  ]
  createContainer(imageForFile(genFile), binds, cont => {
    execute(cont, runCodeCmd(null, genFile, 'generated/file.txt'), callback)
  })
}

function runSubFile(subFile, volG, volS, callback) {
  binds = [
    volG.name + ':/generated:ro',
    volS.name + ':/output',
    fs.realpathSync(subFile, []) + ':/' + subFile + ':ro'
  ]
  createContainer(imageForFile(subFile), binds, cont => {
    execute(cont, runCodeCmd('generated/file.txt', subFile, 'output/file.txt'), callback)
  })
}

function runEvalFile(evalFile, volG, volS, callback) {
  binds = [
    volG.name + ':/generated:ro',
    volS.name + ':/output:ro',
    fs.realpathSync(evalFile, []) + ':/' + evalFile + ':ro'
  ]
  createContainer(imageForFile(evalFile), binds, cont => {
    execute(cont, runCodeCmd(null, evalFile, null), callback)
  })
}

function fullRun(genFile, subFile, evalFile, callback) {
  console.log("Running...")

  createVolume(volG => {
    createVolume(volS => {
      runGenFile(genFile, volG, () => {
        runSubFile(subFile, volG, volS, () => {
          runEvalFile(evalFile, volG, volS, callback)
        })
      })
    })
  })
}

// docker stop $(docker container ls -q) && docker rm $(docker container ls -aq)  ---to remove all docker containers---
// docker volume rm $(docker volume list -q)   ---to remove all docker volumes---
// wc -c shared/Submission.java | grep -o -m 1 "[[:digit:]]*


fullRun('java/example/path/Generation.py', 'java/example/path/Submission.java', 'java/example/path/Evaluation.java', result => { console.log(result) })

module.exports = {
  fullRun
}