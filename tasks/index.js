const vfs = require('vinyl-fs');

const { buildAsync, buildWatchdAsync } = require('./build');
const { bundleAsync } = require('./bundle');
const { tslint, reporter } = require('@ngx-devtools/lint');
const { streamToPromise } = require('@ngx-devtools/common');

const tslintAsync = async () => {
  await streamToPromise(vfs.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(reporter())
  );
};

exports.buildAsync = buildAsync;
exports.buildWatchdAsync = buildWatchdAsync;
exports.bundleAsync = bundleAsync;
exports.tslintAsync = tslintAsync
