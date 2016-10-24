var gsUpload = require('./gsUpload');
var gsCleanup = require('./gsCleanup');
var mvToEE = require('./mvToEE');

function addFile(file, eePath, callback) {
  console.log(`Uploading: ${file}`);
  gsUpload(file, (info) => {
    console.log(`Moving ${info.gs} to Earth Engine ${eePath}/${info.filename}`);
    mvToEE(info.gs, `${eePath}/${info.filename}`, () => {
      gsCleanup(info.gs, callback);
    });
  });
}

module.exports = addFile;