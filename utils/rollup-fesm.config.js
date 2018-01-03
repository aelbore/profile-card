const config = require('./bundle-config');
const utils = require('./bundle-utils');

module.exports = {
  input: `${config.folder.build}/${config.rollup.entry}`,
  external: config.rollup.external,
  format: 'es',
  allowRealFiles: true,
  plugins: utils.plugins,
  onwarn: utils.onwarn
};