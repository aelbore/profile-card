## Angular Elements used as custom elements in Angular and Preact App Demo

Web Components consist of 4 main features which can be used separately or all together:

+ Custom Elements – APIs to define new HTML elements.
+ Shadow DOM – Encapsulated DOM and styling, with composition
+ HTML Imports – Declarative methods of importing HTML documents into other documents
+ HTML Templates – The `<template>` element, which allows documents to contain inert chunks of DOM.

https://en.wikipedia.org/wiki/Web_Components
<br /><br />

### Getting Started
<br />

#### Requirements
+ Nodejs version 7+
+ Git Bash
<br />

##### Clone Repository
```
https://github.com/aelbore/profile-card.git
cd profile-card

git submodule init
git submodule update --remote

npm install

npm run vendor:bundle
```  
<br />

##### Install ngx cli
```
npm install -g @ngx-devtools/cli
```
<br />

##### Bundle Profile Card Angular Elements
```
ngx run bundle
```
<br />

##### Install submodules dependencies
```
cd ng-profile-card-demo
npm install

cd ..
cd preact-profile-card-demo
npm install
```
<br />

##### Bundle or Build dependencies
```
cd ng-profile-card-demo
ngx run bundle

cd ..
cd preact-profile-card-demo
npm run build
```
<br />

##### Start the application
```
/// for Preact
ngx run serve --type preact

/// for Angular
ngx run serve --type angular
```

