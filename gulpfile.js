const glob = require('glob');
const path = require('path');

const argv = require('yargs')
  .option('type', { default: null, type: 'string' })
  .argv;

glob.sync(path.resolve('./tasks/**/*.js'))
  .forEach(task => require(task));