
const utils = require('./bundle-utils');

module.exports = {
  "src": [ "src/**/*.ts", "!src/**/*.spec.ts" ],
  "minify": process.env.PROD,
  "rollup": {
    "entry": utils.entry,
    "umdName": utils.moduleId + '.umd.js',
    "moduleName": utils.moduleId,
    "external": [ 
      "@angular/core", 
      "@angular/http", 
      "@angular/forms", 
      "@angular/common", 
      '@angular/common/http',
      "@angular/router", 
      '@angular/animations',
      "@angular/platform-browser/animations",
      "@angular/platform-browser",
      "@angular/platform-browser-dynamic",
      "@angular/elements",
      "Rx"
    ],
    "globals": { 
      "@angular/core": "ng.core",
      "@angular/common": "ng.common",
      "@angular/forms": "ng.forms",
      "@angular/router": "ng.router",
      "@angular/http": "ng.http",  
      '@angular/animations': 'ng.animations',
      '@angular/common/http': 'ng.common.http',
      "@angular/platform-browser/animations": "ng.platformBrowser.animations",
      "@angular/platform-browser": "ng.platformBrowser",
      "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
      "@angular/elements": "ng.elements",
      "Rx": "Rx"
    }
  },
  "folder": { 
    "tmp": ".tmp", 
    "build": "build", 
    "dest": "dist" 
  },
  "tsconfigEs5": "utils/tsconfig-es5.js"
};