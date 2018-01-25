const { build, rimraf, watch } = require('@ngx-devtools/build');

const buildAsync = async () => await rimraf('dist').then(() => build());
const buildWatchdAsync = async () => await buildAsync().then(() => watch());

exports.buildAsync = buildAsync;
exports.buildWatchdAsync = buildWatchdAsync;
