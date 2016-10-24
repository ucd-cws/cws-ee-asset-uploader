var runCmd = require('./runCmd');
var path = require('path');
var bucket = require('./config').GS_ROOT;

function gsUpload(file, callback) {
  var fileinfo = path.parse(file);

  runCmd(
    `gsutil cp ${file} ${bucket}`,
    process.cwd(),
    (data) => {
      console.log(data);
    },
    (data) => {
      // WHY is gsutils dumping to stderr...
      // console.error(data);
      // throw new Error(`Error uploading ${file} to ${bucket}`);
    },
    function() {
      callback({
        filename : fileinfo.name,
        gs: `${bucket}/${fileinfo.base}`
      });
    }
  );
  
}

module.exports = gsUpload;