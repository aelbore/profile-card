const sass = require('node-sass');
const inlineNg2Template = require('gulp-inline-ng2-template');
const htmlMinifier = require('html-minifier');
const cleanCss = require('clean-css');

const bundle = require('../utils/bundle-config');
let toBuild = true;

const toBundleMinify = (!(bundle.hasOwnProperty('minify')))
      ? false : ((bundle['minify']) ? bundle['minify'] : false);

const styleProcessor = (stylePath, ext, styleFile, callback) => {
  if (ext[0] === '.scss') {
    let sassObj = sass.renderSync({ file: stylePath }); 
    if (sassObj && sassObj['css']){
      if (toBundleMinify && !(toBuild)){
        let output = new cleanCss({}).minify(sassObj.css.toString('utf8'));
        styleFile = output.styles.toString('utf8');   
      } else {
        styleFile = sassObj.css.toString('utf8');
      }
    }
  }
  return callback(null, styleFile);  
};

const minifyTemplate = (path, ext, file, cb) => {
  try {
    let newFile;
    if (toBundleMinify && !(toBuild)){
      newFile = htmlMinifier.minify(file, {
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
        removeRedundantAttributes: true
      });
    } else {
      newFile = file;
    }
    cb(null, newFile);
  }
  catch (err) {
    cb(err);
  }
}

let OPTIONS = {
  base: 'src', 
  useRelativePaths: true,
  styleProcessor: styleProcessor,
  templateProcessor: minifyTemplate
}; 

const ng2InlineTemplate = (isToBuild) => {
  toBuild = (isToBuild) ? true : false;
  return inlineNg2Template(OPTIONS);
};

exports.ng2InlineTemplate = ng2InlineTemplate;
