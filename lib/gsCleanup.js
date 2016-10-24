var runCmd = require('./runCmd');
var path = require('path');
var bucket = require('./config').GS_ROOT;

function gsUpload(file, callback) {
  var filename = path.parse(file).base;

  runCmd(
    `gsutil rm ${file}`,
    process.cwd(),
    (data) => {
      console.log(data);
    },
    (data) => {
      // console.error(data);
      // throw new Error(`Error cleaning up ${file}`);
    },
    function() {
      callback();
    }
  );
  
}

module.exports = gsUpload;