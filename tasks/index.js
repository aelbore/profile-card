const vfs = require('vinyl-fs');

const { tslint, reporter } = require('@ngx-devtools/lint');
const { streamToPromise } = require('@ngx-devtools/common');

const tslintAsync = async () => {
  await streamToPromise(vfs.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(reporter())
  );
};

exports.tslintAsync = tslintAsync
