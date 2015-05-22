'use strict';

var gulp = require('gulp');
var variables = require('./_variables');
var common = require('./_common');
var $ = require('gulp-load-plugins')();
$.wiredep = require('wiredep').stream;

gulp.task('serve', ['jshint', 'serve-watch'], function () {

  var baseDir = [
    variables.src.tmp,
    variables.src.app
  ];
  var filesToSync = [
    variables.src.tmp + variables.filter.html,
    variables.src.tmp + variables.filter.css,
    variables.src.assets + variables.filter.all,
    variables.src.bowerComponents + 'mh-services/dist/' + variables.filter.all
  ];
  filesToSync = filesToSync.concat(variables.src.appJS);
  common.browserSyncInit(baseDir, filesToSync);

});
gulp.task('serve-watch', ['serve-fonts', 'serve-partials', 'serve-styles'], serveWatch);

var injectAssetsIntoIndexHtml = function (stream) {
  var jsToInject =
    gulp
      .src(variables.src.appJS)
      .pipe($.naturalSort('asc'))
      .pipe($.angularFilesort());
  return stream
    .pipe($.inject(jsToInject, {relative: true, ignorePath: '../src/'})) //inject public's core scripts
    .pipe($.wiredep({ // inject bower_components js+css
      //exclude: ['jeet.gs'] // exclude some component if needed
    }));
};

gulp.task('serve-partials', function () {
  var indexFilter = $.filter('index.html');

  var str = gulp
    .src(variables.src.JADEParents)
    .pipe($.plumber())
    .pipe($.jade({pretty: true}))
    .pipe(indexFilter);

  return injectAssetsIntoIndexHtml(str)
    .pipe(gulp.dest(variables.src.tmp))
    .pipe(indexFilter.restore())
    .pipe($.cached('compiled-html'))
    .pipe(gulp.dest(variables.src.tmp + variables.src.components));
});

gulp.task('serve-styles', function () {
  return gulp.src(variables.src.SCSSParents, {base: variables.src.app + variables.src.components + '_global/styles/'})
    .pipe($.plumber())
    //.pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sass()).on('error', common.errorHandler('SCSS'))
    //.pipe($.sourcemaps.write())
    .pipe($.autoprefixer({
      browsers: ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'Firefox > 2'],
      cascade: false
    }))
    .pipe($.flatten())
    .pipe(gulp.dest(variables.src.tmp));
});

//This task is a temp solution for
// https://trello.com/c/pE9hLDn1/176-fonts-why-our-app-try-to-load-fonts-from-global-fonts
gulp.task('serve-fonts', function () {
  return gulp.src([
    variables.src.app + variables.src.fonts + '*',
    variables.src.app + 'bower_components/fontawesome/fonts/*',
    variables.src.app + 'bower_components/bootstrap-sass-official/assets/fonts/**/*'])
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe(gulp.dest(variables.src.tmp + variables.src.components + '_global/' + variables.src.fonts));
});

gulp.task('serve-common', ['common-svgs'], function () {

  /* SVG SECTION */
  function fileContents (filePath, file) {
    return file.contents.toString('utf8');
  }

  /* SVG SECTION END */

  return gulp.src(variables.src.app + 'index.html')
    .pipe($.inject(gulp.src(variables.src.tmpSVGSprite), {transform: fileContents}))
    .pipe(gulp.dest(variables.src.tmp));
});


function serveWatch () {
  $.watch(variables.src.JADEAll.concat(variables.src.appJS),function(){
    gulp.start('serve-partials');
  });

  $.watch(variables.src.SCSSAll,function(){
    gulp.start('serve-styles');
  });

  $.watch(variables.src.allJS,function(){
  	gulp.start('jshint');
  });
  gulp.watch('bower.json', ['serve-partials']);
}
