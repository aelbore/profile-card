const gulp = require('gulp');
const rename = require('gulp-rename');
const rollup = require('gulp-rollup');
const base64 = require('gulp-base64-inline');
const gulpSequence = require('gulp-sequence').use(gulp);
const ngc = require('@angular/compiler-cli/src/main').main;

const rimraf = require('rimraf');

const config = require('../utils/bundle-config');
const umdConfig = require('../utils/rollup-umd.config');
const fesmConfig = require('../utils/rollup-fesm.config');
const ng2InlineTemplate = require('../utils/ng2-inline-template').ng2InlineTemplate;

const fs = require('fs');
const path = require('path');
const through2 = require('through2');

const copyBuildFiles = [
  `${config.folder.build}/**/*`, 
  `!${config.folder.build}/${config.rollup.entry}`, 
  `package.json`
];

const buildFiles = `${config.folder.build}/**/*.js`;

gulp.task('bundle:clean:tmp', (done) => { return rimraf(config.folder.tmp, done); });
gulp.task('bundle:clean:build', (done) => { return rimraf(config.folder.build, done); });
gulp.task('bundle:clean:dist', (done) => { return rimraf(config.folder.dest, done); });

gulp.task('bundle:create:tsconfig', (done) => {
  return gulp.src(config.tsconfigEs5)
      .pipe(through2.obj((file, enc, done) => {
        const dest = path.join(process.env.APP_ROOT_PATH, config.folder.tmp, 'tsconfig-es5.json');
        fs.writeFileSync(dest, JSON.stringify(require(file.path), null, '\t'));
        done();
    }));
});

gulp.task('bundle:copy:source', (done) => {
  return gulp.src(config.src)
    .pipe(ng2InlineTemplate())
    .pipe(base64())
    .pipe(gulp.dest(config.folder.tmp));
});

gulp.task('bundle:copy:build', (done) => {
  return gulp.src(copyBuildFiles)
    .pipe(gulp.dest(config.folder.dest));
});

gulp.task('bundle:ngc', (done) => {
  ngc([ '--project', `${config.folder.tmp}/tsconfig-es5.json` ]);
  return Promise.resolve();
});

gulp.task('bundle:rollup:umd', (done) => {
  return gulp.src(buildFiles)
    .pipe(rollup(umdConfig))
    .pipe(rename(config.rollup.umdName))
    .pipe(gulp.dest(`${config.folder.dest}/bundles`));  
});

gulp.task('bundle:rollup:fesm', (done) => {
  return gulp.src(buildFiles)
    .pipe(rollup(fesmConfig))
    .pipe(gulp.dest(config.folder.dest));  
});

gulp.task('bundle:clean', gulpSequence([ 'bundle:clean:tmp', 'bundle:clean:build', 'bundle:clean:dist' ]));
gulp.task('bundle:rollup', gulpSequence([ 'bundle:rollup:fesm', 'bundle:rollup:umd' ]));

gulp.task('bundle', 
  gulpSequence('bundle:clean',
    'bundle:copy:source',
    'bundle:create:tsconfig',
    'bundle:ngc',
    'bundle:rollup',
    'bundle:copy:build',
    [ 'bundle:clean:tmp', 'bundle:clean:build' ]));