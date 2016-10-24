var exec = require('child_process').exec;
var os = require('os');

module.exports = function(cmd, cwd, onStdOut, onStdErr, onComplete) {
  var cmdOptions = {
    maxBuffer: 1024 * 100000, 
    cwd: cwd
  }

  // Use bash and wine if we are not on windows
  if( os.type() !== 'Windows_NT' ) {
    cmdOptions.shell = '/bin/bash';
  }

  var child = exec(cmd, cmdOptions);

  child.stdout.on('data', (data) => {
  onStdOut(data);
  });
  child.stderr.on('data', (data) => {
    onStdErr(data);
  });
  child.on('close', onComplete);
}