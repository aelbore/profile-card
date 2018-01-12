const path = require('path');
const pkg = require(path.join(process.env.APP_ROOT_PATH, 'package.json'));

const names = pkg.name.split('/');
const pkgName = (names.length < 2) ? names : names[1];

module.exports = {
  "compilerOptions": {
    "declaration": true,
    "module": "es2015",
    "target": "es5",
    "baseUrl": ".",
    "sourceMap": false,
    "stripInternal": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "outDir": "./esm5",
    "rootDir": ".",
    "lib": ["es2015", "dom"],
    "skipLibCheck": true,
    "types": []
  },
  "angularCompilerOptions": {
    "annotateForClosureCompiler": true,
    "strictMetadataEmit": true,
    "skipTemplateCodegen": true,
    "flatModuleOutFile": `${pkgName}.js`,
    "flatModuleId": `${pkgName}`
  },
  "files": [
    "./public_api.ts"
  ]
}