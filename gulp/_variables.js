'use strict';

var variables = {};

variables.filter = {};
variables.filter.all = '**/*';
variables.filter.css = '**/*.css';
variables.filter.js = '**/*.js';
variables.filter.testsJS = '**/*.spec.js';
variables.filter.scss = '**/*.scss';
variables.filter.scssEmbedded = '**/_*.scss';
variables.filter.html = '**/*.html';
variables.filter.htmlIndex = 'index.html';
variables.filter.jade = '**/*.jade';
variables.filter.jadeEmbedded = '**/_*.jade';
variables.filter.jadeIndex = 'index.jade';
variables.filter.svg = '**/*.svg';
variables.filter.fonts = '**/*.{eot,svg,ttf,woff,woff2}';
variables.filter.mainCss = 'main.css';

variables.src = {};
variables.src.app = 'src/';
variables.src.tmp = '.tmp/';
variables.src.dist = 'dist/';
variables.src.components = 'components/';
variables.src.gulp = 'gulp/';
variables.src.e2e = 'e2e/';
variables.src.nodeModules = 'node_modules/';
variables.src.bowerComponents = 'bower_components/';
variables.src.assets = variables.src.app + 'assets/';
variables.src.images = variables.src.assets + 'images/';
variables.src.fonts = variables.src.assets + 'fonts/';

variables.src.componentsPath = variables.src.app + variables.src.components;

variables.src.allJS = [ //all js files, that was been written by our developers
  './*.js', //js files in root, like "gulpfile.js"
  variables.src.gulp + variables.filter.js, //gulp files
  variables.src.app + variables.src.components + variables.filter.js, //app files
  variables.src.e2e + variables.filter.js]; //e2e files

variables.src.appJS = [ //only files of AngularJS app, without tests
  variables.src.app + variables.src.components + variables.filter.js,
  '!' + variables.src.app + variables.src.components + variables.filter.testsJS];

variables.src.SCSSAll = variables.src.componentsPath + variables.filter.scss;
variables.src.SCSSChildren = variables.src.componentsPath + variables.filter.scssEmbedded;
variables.src.SCSSParents = [variables.src.SCSSAll, '!' + variables.src.SCSSChildren];

variables.src.JADEAll = [variables.src.componentsPath + variables.filter.jade, variables.src.app + variables.filter.jadeIndex];
variables.src.JADEChildren = variables.src.componentsPath + variables.filter.jadeEmbedded;
variables.src.JADEParents = variables.src.JADEAll.concat('!' + variables.src.JADEChildren);


module.exports = variables;
