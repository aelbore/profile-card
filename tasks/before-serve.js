const vfs = require('vinyl-fs');

const { Transform } = require('stream');
const { writeFileSync, readFileSync } = require('fs');
const { resolve, join } = require('path');

const { streamToPromise } = require('@ngx-devtools/common');

const argv = require('yargs')
  .option('type', { default: null, type: 'string' })
  .argv;

module.exports = () => {
  const htmlOutputFilePath = join(resolve(), 'public', 'index.html');
  const htmlReplace = () => new Transform({
    objectMode: true,
    transform (file, enc, done) {
      const htmlFileString = readFileSync(file.path, 'utf-8');
      let replaceString = 'preact-profile-card-demo.js';
      switch(argv.type) {
        case 'angular': 
          replaceString = 'ng-profile-card-demo.umd.min.js';
          break;
      }
      const newFileString = htmlFileString.replace('${file-bundle}', replaceString);
      writeFileSync(htmlOutputFilePath, newFileString);
      done();   
    }
  });
  return streamToPromise(vfs.src('index.html').pipe(htmlReplace()))
}