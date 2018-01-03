const path = require('path');
const glob = require('glob-all');

const rxjsAdd = path.join(process.env.APP_ROOT_PATH, 'node_modules/rxjs/add/**/*.js');
const rxjs = path.join(process.env.APP_ROOT_PATH, 'node_modules/rxjs/*.js');

module.exports = {
  name: "rxjs external globals",
  options (opts) {
    const copyConfig = Object.assign({}, opts);
    glob.sync([ rxjsAdd, rxjs ])
    .map(file => file.substr(file.match('rxjs').index, file.length).replace('.js', ''))
    .forEach(file => { 
      if (!(copyConfig.external.find(value => value === file))) {
        copyConfig.external.push(file);
      }
    });
    if (copyConfig.globals) {
      glob.sync([ rxjs ])
      .map(file => file.substr(file.match('rxjs').index, file.length).replace('.js', ''))
      .forEach(file => {  
        if (!(Object.keys(copyConfig.globals).find(key => key === file))) {
          copyConfig.globals[file] = file;
        }
      });
    }
    return copyConfig;    
  }
};