const vfs = require('vinyl-fs');

const { buildAsync, buildWatchdAsync } = require('./build');
const { bundleAsync } = require('./bundle');
const { tslint, reporter } = require('ngx-lint');

const streamToPromise = async (strm) =>{
  await new Promise((resolve, reject) => {
    strm.on('error', reject);
    strm.resume();
    strm.on('end', resolve);
  });
};

const tslintAsync = async () => {
  await streamToPromise(vfs.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(reporter())
  );
};

exports.buildAsync = buildAsync;
exports.buildWatchdAsync = buildWatchdAsync;
exports.bundleAsync = bundleAsync;
exports.streamToPromise = streamToPromise;
exports.tslintAsync = tslintAsync
