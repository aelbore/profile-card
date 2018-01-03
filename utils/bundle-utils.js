const uglify = require('rollup-plugin-uglify');
const minify = require('uglify-es').minify;
const path = require('path');
const glob = require('glob-all');

const tsConfigEs5 = require('./tsconfig-es5');
const plugins = [];

const pluginPaths = path.join(process.env.APP_ROOT_PATH, 'utils', '*-plugin.js');
glob.sync([ pluginPaths ]).forEach(file => plugins.push(require(file)));

if (process.env.PROD === 'true'){
  plugins.push(uglify({}, minify));
}

module.exports = {
  onwarn: (warning) => {
    if (warning.code === 'THIS_IS_UNDEFINED') { return; }
    console.log("Rollup warning: ", warning.message);
  },
  entry: tsConfigEs5.files[0].replace('ts', 'js').replace(/\\/g, '').replace(/\//g, '').replace('.', ''),
  moduleId: tsConfigEs5.angularCompilerOptions.flatModuleId,
  plugins: plugins
};