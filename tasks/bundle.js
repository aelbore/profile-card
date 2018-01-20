const { bundle, rimraf } = require('ngx-bundle');

exports.bundleAsync = async ()  => { 
  await Promise.all([ rimraf('dist'), rimraf('.tmp') ])
    .then(() => bundle())
    .then(() => rimraf('.tmp'));
};