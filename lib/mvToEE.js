var runCmd = require('./runCmd');
var utils = require('./utils');
var config = require('./config');

function mvToEE(gsFile, eePath, callback) {
  var token;
  runCmd(
    `earthengine upload image --asset_id=${eePath} ${gsFile}`,
    process.cwd(),
    (data) => {
      if( token ) return;
      token = utils.getEEProcessToken(data);
      if( !token ) {
        throw new Error(data);
      }
    },
    (data) => {
      console.error(data);
      throw new Error(`Error moving image from GS (${gsFile}) to EE (${eePath})`);
    },
    () => {
      setTimeout(() => {
        checkStatus(token, callback)
      }, 200);
    }
  )
}

function remove(eePath, callback) {
  runCmd(
    `earthengine rm ${eePath}`,
    process.cwd(),
    (data) => {
      // run silently
    },
    (data) => {
      // run silently
    },
    () => {
      callback();
    }
  )
}

function checkStatus(token, callback) {
  var resp, txt;
  runCmd(
    `earthengine task info ${token}`,
    process.cwd(),
    (data) => {
      if( resp ) return;
      txt = data;
      resp = utils.parseEEResponse(data);
    },
    (data) => {
      console.error(data);
      throw new Error(`Error moving image from GS to EE`);
    },
    () => {
      switch (resp.State) {
        case 'COMPLETED':
          console.log(txt);
          callback();
          break;
        case 'RUNNING':
          setTimeout(function(){
            checkStatus(token, callback);
          }, 2000);
          break;
        case 'FAILED':
          console.error(txt);
          throw new Error(`Error moving image from GS to EE`);
        default:
          setTimeout(function(){
            checkStatus(token, callback);
          }, 2000);
          // console.error(txt);
          // throw new Error(`Unknown response state (${resp.State}) from earthengine command line tool`);
      }
    }
  )
}

module.exports = function(gsFile, eePath, callback) {
  if( config.rm ) {
    remove(eePath, () => {
      mvToEE(gsFile, eePath, callback);
    });
  } else {
    mvToEE(gsFile, eePath, callback);
  }
};