/*
 *    Code to demo compiling and running arbitrary Java.
 *    Looks for Submission.java in javaDir, then feeds its output to Evaluation.java
 *
 *    You may have to run "npm install node-jre" before running this file.
 */

var exec = require('child_process').exec;
var jre = require('node-jre');

var javaDir = 'java/example/path';

// compiling the submission code
var childS = exec('javac ' + javaDir + '/Submission.java', function(error, stdout, stderr) {

    // running the submission code
    var output = jre.spawnSync( [javaDir], 'Submission', ['Arbitrary Input'], { encoding: 'utf8' }).stdout.trim();
    console.log('Submission output: "' + output + '"');

    // compiling the evaluation code
    var childE = exec('javac ' + javaDir + '/Evaluation.java', function(error, stdout, stderr) {

        // running the evaluation code
        var score = jre.spawnSync( [javaDir], 'Evaluation', [output], { encoding: 'utf8' }).stdout.trim();
        console.log('Submission score: ' + score);
    });

    console.log('childE pid: ' + childE.pid);
});

console.log('childS pid: ' + childS.pid);
