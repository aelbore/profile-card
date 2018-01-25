const { bundle, rimraf } = require('@ngx-devtools/bundle');

exports.bundleAsync = async ()  => { 
  await Promise.all([ rimraf('dist'), rimraf('.tmp') ])
    .then(() => bundle())
    .then(() => rimraf('.tmp'));
};