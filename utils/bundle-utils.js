const path = require('path');
const glob = require('glob-all');

const tsConfigEs5 = require('./tsconfig-es5');
const plugins = [];

const pluginPaths = path.join(process.env.APP_ROOT_PATH, 'utils', '*-plugin.js');
glob.sync([ pluginPaths ]).forEach(file => plugins.push(require(file)));

module.exports = {
  onwarn: (warning) => {
    if (warning.code === 'THIS_IS_UNDEFINED') { return; }
    console.log("Rollup warning: ", warning.message);
  },
  entry: tsConfigEs5.angularCompilerOptions.flatModuleOutFile,
  moduleId: tsConfigEs5.angularCompilerOptions.flatModuleId,
  plugins: plugins
};