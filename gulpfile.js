const glob = require('glob');
const path = require('path');

const argv = require('yargs')
  .option('type', { default: null, type: 'string' })
  .argv;

process.env.APP_ROOT_PATH = __dirname;

glob.sync(path.join(process.env.APP_ROOT_PATH, './tasks/**/*.js'))
  .forEach(task => require(task));