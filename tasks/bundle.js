const gulp = require('gulp');
const ngxBundle = require('ngx-bundle');

gulp.task('bundle', async (done) => {
  await Promise.all([ ngxBundle.rimraf('dist'), ngxBundle.rimraf('.tmp') ])
    .then(() => ngxBundle.bundle())
    .then(() => ngxBundle.rimraf('.tmp'));
});