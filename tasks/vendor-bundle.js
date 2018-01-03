const gulp = require('gulp');
const concat = require('gulp-concat');
const strip = require('gulp-strip-comments');

const vendors = [
  'node_modules/@angular/core/bundles/core.umd.min.js',
  'node_modules/@angular/common/bundles/common.umd.min.js',
  'node_modules/@angular/compiler/bundles/compiler.umd.min.js',
  'node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js',
  'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js'
];

gulp.task('vendor:bundle', (done) => {
  return gulp.src(vendors)
    .pipe(concat('angular.js'))
    .pipe(strip())
    .pipe(gulp.dest('public'));
});