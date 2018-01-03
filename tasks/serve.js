const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const server = require('gulp-develop-server');
const through2 = require('through2');

const argv = require('yargs').argv;

gulp.task('serve', (done) => {
  server.listen({ path: path.join(process.env.APP_ROOT_PATH, 'server.js') });
});

gulp.task('replace:html', (done) => {
  const htmlOutputFilePath = path.join(process.env.APP_ROOT_PATH, 'public', 'index.html');
  return gulp.src('index.html')
    .pipe(through2.obj((file, enc, done) => {
      const htmlFileString = fs.readFileSync(file.path, 'utf-8');
      let replaceString = 'preact-profile-card-demo.js';
      switch(argv.type) {
        case 'angular': 
          replaceString = 'ng-profile-card-demo.umd.js';
          break;
      }
      const newFileString = htmlFileString.replace('${file-bundle}', replaceString);
      fs.writeFileSync(htmlOutputFilePath, newFileString);
      done();
    }));
});