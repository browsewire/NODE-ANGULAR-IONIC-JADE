'use strict';
/* jslint node: true */

var gulp = require('gulp');

require('require-dir')('./gulp'); //jshint ignore:line

gulp.task('default', function () {
  gulp.start('serve');
});
