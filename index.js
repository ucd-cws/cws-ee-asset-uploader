var program = require('commander');
var glob = require('glob');
var async = require('async');
var readline = require('readline');
var addFile = require('./lib/addFile');
var config = require('./lib/config');

program
  .version(require('./package.json').version)
  .usage('cws-ee-asset-uploader [Earth Engine Path] <File...>')
  .option('-y, --yes', 'Do not prompt for approval before uploading')
  .option('-r, --rm', 'Allow overwriting of existing EE files')
  .parse(process.argv);

if( program.args.length < 2 ) {
  throw new Error('You must provide a Earth Engine location and files to upload');
}

var eeLocation = program.args.splice(0, 1)[0];
var files = program.args;

var arr = [];
async.eachSeries(
  files,
  (file, next) => {
    glob(file, {}, function (err, fileList) {
      if( err ) throw err;

      fileList.forEach((f) => { arr.push(f) });
      next();
    });
  },
  (err) => {
    if( err ) throw err;
    onExpandComplete();
  }
)

function onExpandComplete() {
  console.log('*** Uploading ***');
  arr.forEach((f) => {
    console.log(`  ${f}`);
  });
  console.log('*** To ***');
  console.log(`  ${eeLocation}\n`);
  console.log('');

  if( program.yes ) {
    return run();
  }
  
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Would you like to proceed? [Y/n]: ', (answer) => {
    answer = answer.toLowerCase().trim();
    if( answer === 'y' || answer === 'yes' ) {
      run();
    }
    rl.close();
  });

  rl.on('line', function(line){
      console.log(line);
  })
}

config.rm = program.rm;

function run() {
  async.eachSeries(
    arr, 
    (file, next) => {
      addFile(file, eeLocation, () => {
        next();
      });
    },
    (err) => {
      if( err ) throw err;
      console.log('done');
    }
  )
}

