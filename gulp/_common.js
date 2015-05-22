'use strict';

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var variables = require('./_variables');

var common = {};

common.errorHandler = errorHandler;
common.browserSyncInit = browserSyncInit;

module.exports = common;

gulp.task('jshint', jshint);
gulp.task('validate', ['jshint'/*, 'test'*/]);
gulp.task('test', test);
gulp.task('annotate',annotate);


function annotate(){
  gulp.src('../services/src/'+variables.filter.js)
    .pipe($.ngAnnotate({
      //remove: true,
      add: true,
      single_quotes: true //jshint ignore:line
    }))
    .pipe(gulp.dest('../services/src/'));
}

/// Implementation below ///

function errorHandler (title) {
  return function (err) {
    $.util.beep();
    $.util.log($.util.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
}

function browserSyncInit (baseDir, filesToSync) {
  var options = {
    files: filesToSync,
    server: {
      baseDir: baseDir,
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    ui: false
  };
  browserSync.init(options);
}

function jshint() {
  return gulp.src(variables.src.allJS)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
}

function test() {
  return gulp.src(variables.src.app+variables.src.components+variables.filter.all,{cwd:'src'})
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
}
