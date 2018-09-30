var Docker = require('dockerode')
const fs = require('fs')
const pathToCodeFiles = fs.realpathSync('java/example/path', [])

var docker = new Docker({
  socketPath: '/var/run/docker.sock'
})

function createVolume(callback) {
  docker.createVolume({
      Labels: {}
    },
    function (err, volume) {
      console.log('Volume created: ' + volume.name)
      callback(volume)
    }
  )
}

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

function createContainer(image, binds, callback) {
  docker.createContainer({
      Image: image,
      Tty: true,
      Binds: binds
    },
    function (err, container) {
      container.start({}, function (err, data) {
        console.log('Container created: ' + container.id)
        callback(container)
      })
    }
  )
}

function execute(container, cmd, callback = null) {
  container.exec({
      Cmd: ['sh', '-c', cmd],
      AttachStdout: callback != null,
      AttachStderr: callback != null
    },
    function (err, exec) {
      if (err) {
        console.error('Error in runCommand: ' + err)
        return
      }

      exec.start(function (err, stream) {
        if (err) {
          console.error('Error in runCommand: ' + err)
          return
        }

        if (callback) {
          var result = ''
          stream.on('data', function (chunk) {
            result += Buffer([...chunk].slice(8)).toString('utf8') // the first byte is not wanted
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

function runGenFile(genFile, volG, callback) {
  binds = [
    volG.name + ':/generated',
    pathToCodeFiles + genFile + ':/' + genFile + ':ro'
  ]
  createContainer(imageForFile(genFile), binds, cont => {
    execute(cont, runCodeCmd(null, genFile, 'generated/file.txt'), callback)
  })
}

function runSubFile(subFile, volG, volS, callback) {
  binds = [
    volG.name + ':/generated:ro',
    volS.name + ':/output',
    pathToCodeFiles + subFile + ':/' + subFile + ':ro'
  ]
  createContainer(imageForFile(subFile), binds, cont => {
    execute(
      cont,
      runCodeCmd('generated/file.txt', subFile, 'output/file.txt'),
      callback
    )
  })
}

function runEvalFile(evalFile, volG, volS, callback) {
  binds = [
    volG.name + ':/generated:ro',
    volS.name + ':/output:ro',
    pathToCodeFiles + evalFile + ':/' + evalFile + ':ro'
  ]
  createContainer(imageForFile(evalFile), binds, cont => {
    execute(cont, runCodeCmd(null, evalFile, null), callback)
  })
}

function fullRun(genFile, subFile, evalFile, callback) {
  createVolume(volG => {
    createVolume(volS => {
      runGenFile(genFile, volG, () => {
        runSubFile(subFile, volG, volS, () => {
          runEvalFile(evalFile, volG, volS, () => {
            binds = [volG.name + ':/generated:ro', volS.name + ':/output:ro']
            createContainer(imageForFile(evalFile), binds, cont => {
              execute(cont, 'ls -las && cat generated/file.txt', callback)
            })
          })
        })
      })
    })
  })
}

// docker stop $(docker container ls -q) && docker rm $(docker container ls -aq)  ---to remove all docker containers---

// fullRun('Generation.py', 'Submission.java', 'Evaluation.java', result => {
// console.log(result)
// })

module.exports = {
  fullRun
}