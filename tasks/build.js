const { build, watch } = require('@ngx-devtools/build');
const { rimraf } = require('@ngx-devtools/common');

const buildAsync = async () => await rimraf('dist').then(() => build());
const buildWatchdAsync = async () => await buildAsync().then(() => watch());

exports.buildAsync = buildAsync;
exports.buildWatchdAsync = buildWatchdAsync;
