
const vfs = require('vinyl-fs');

const gulp = require('gulp');
const server = require('gulp-develop-server');

const { resolve, join } = require('path');
const { Transform } = require('stream');
const { writeFileSync, readFileSync } = require('fs');

const { buildAsync, buildWatchdAsync, bundleAsync, tslintAsync } = require('./tasks');
const { streamToPromise } = require('@ngx-devtools/common');
const { karmaServeAsync } = require('@ngx-devtools/test/utils');

const argv = require('yargs')
  .option('type', { default: null, type: 'string' })
  .argv;

const serveAsync = async () => {
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
  await streamToPromise(vfs.src('index.html')
    .pipe(htmlReplace())
  ).then(() => {
    server.listen({ path: resolve('server.js') });
    Promise.resolve();
  });
};
  
gulp.task('build', async () => await buildAsync());

gulp.task('build:watch', async () => await buildWatchdAsync());

gulp.task('bundle', async () => await bundleAsync());

gulp.task('default', async () => await serveAsync());

gulp.task('tslint', async () => await tslintAsync());

gulp.task('test', async () => await karmaServeAsync());

require('./tasks/vendor-bundle');