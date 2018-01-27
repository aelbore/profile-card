const { bundle } = require('@ngx-devtools/bundle');
const { rimraf } = require('@ngx-devtools/common');

exports.bundleAsync = async ()  => { 
  await Promise.all([ rimraf('dist'), rimraf('.tmp') ])
    .then(() => bundle())
    .then(() => rimraf('.tmp'));
};