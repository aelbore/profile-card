const gulp = require('gulp');
const gulpSequence = require('gulp-sequence').use(gulp);
const rename = require('gulp-rename');
const rollup = require('gulp-rollup');
const base64 = require('gulp-base64-inline');
const rimraf = require('rimraf');
const through2 = require('through2');
const async = require('async');
const uglify = require('uglify-js');

const ngc = require('@angular/compiler-cli/src/main').main;

const config = require('../utils/bundle-config');
const umdConfig = require('../utils/rollup-umd.config');
const ng2InlineTemplate = require('../utils/ng2-inline-template').ng2InlineTemplate;

const { writeFile } = require('fs');
const { join } = require('path');

const rootPath = process.env.APP_ROOT_PATH;

const writeTSConfig = (tsConfigFile, fileType, callback) => {
  const tsConfig = require(tsConfigFile);
  switch(fileType) {
    case 'esm2015': 
      tsConfig.compilerOptions.target = "es2015";
      tsConfig.compilerOptions.outDir = "./esm2015";
      break;
  }
  const dest = join(rootPath, config.folder.tmp, `tsconfig-${fileType}.json`);
  writeFile(dest, JSON.stringify(tsConfig, null, '\t'), callback);
};

const minify = () => {
  return through2.obj((file, enc, done) => {
    writeFile(file.path.replace('js', 'min.js'), uglify.minify(file.path).code, done);
  });
};

const rollupBuild = fileType => {
  const fesmConfig = require('../utils/rollup-fesm.config')(fileType);
  return gulp.src(`${config.folder.tmp}/${fileType}/*.js`)
    .pipe(rollup(fesmConfig))
    .pipe(gulp.dest(`${config.folder.dest}/${fileType}`));
};

const buildFiles = `${config.folder.build}/**/*.js`;

const copyAssets = [ 
  `${config.folder.tmp}/esm2015/**/*.d.ts`,
  `${config.folder.tmp}/esm2015/*.json`,
  'README.md', 
  'package.json'
];

gulp.task('bundle:clean:tmp', done => rimraf(config.folder.tmp, done));
gulp.task('bundle:clean:dist', done => rimraf(config.folder.dest, done));

gulp.task('bundle:create:tsconfig', (done) => {
  return gulp.src(config.tsconfigEs5)
      .pipe(through2.obj((file, enc, done) => {
        async.parallel([
          callback => writeTSConfig(file.path, 'esm5', callback),
          callback => writeTSConfig(file.path, 'esm2015', callback)
        ], (error, results) => done());
    }));
});

gulp.task('bundle:copy:source', (done) => {
  const vfs = require('vinyl-fs');
  return gulp.src(config.src)
    .pipe(ng2InlineTemplate())
    .pipe(base64())
    .pipe(gulp.dest(config.folder.tmp + '/' + 'src'))
    .pipe(through2.obj((file, enc, done) => {
      const ngEntryPointPath = filePath => join(rootPath, config.folder.tmp, filePath);
      async.parallel([
        callback => writeFile(ngEntryPointPath('index.ts'), `export * from './public_api'`, callback),
        callback => writeFile(ngEntryPointPath('public_api.ts'), `export * from './src/index'`, callback)
      ], (error, results) => done());
    }));
});

gulp.task('bundle:ngc:esm5', (done) => {
  ngc([ '--project', `${config.folder.tmp}/tsconfig-esm5.json` ]);
  return Promise.resolve();
});

gulp.task('bundle:ngc:esm2015', (done) => {
  ngc([ '--project', `${config.folder.tmp}/tsconfig-esm2015.json` ]);
  return Promise.resolve();
});

gulp.task('bundle:rollup:fesm5', done => rollupBuild('esm5'));
gulp.task('bundle:rollup:fesm2015', done => rollupBuild('esm2015'));

gulp.task('bundle:rollup:umd', (done) => {
  return gulp.src(buildFiles)
    .pipe(rollup(umdConfig))
    .pipe(rename(config.rollup.umdName))
    .pipe(gulp.dest(`${config.folder.dest}/bundles`))
    .pipe(minify());
});

gulp.task('bundle:move:assets', (done) => {
  return gulp.src(copyAssets)
    .pipe(gulp.dest(config.folder.dest));
});

gulp.task('bundle:clean', gulpSequence([ 'bundle:clean:tmp',  'bundle:clean:dist' ]));
gulp.task('bundle:ngc', gulpSequence([ 'bundle:ngc:esm5', 'bundle:ngc:esm2015'  ]));

gulp.task('bundle:rollup', gulpSequence([ 'bundle:rollup:fesm5', 'bundle:rollup:fesm2015', 'bundle:rollup:umd' ]));

gulp.task('bundle', 
  gulpSequence('bundle:clean',
    'bundle:copy:source',
    'bundle:create:tsconfig',
    'bundle:ngc', 
    ['bundle:rollup', 'bundle:move:assets']));