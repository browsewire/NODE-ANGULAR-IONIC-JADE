'use strict';

var gulp = require('gulp');
var variables = require('./_variables');
var common = require('./_common');
var $ = require('gulp-load-plugins')();
$.wiredep = require('wiredep').stream;
$.merge = require('merge-stream');
$.del = require('del');

gulp.task('build', ['validate', 'build-common', 'build-images', 'build-fonts']);

gulp.task('build-and-run', ['build','build-watch'], function () {
  common.browserSyncInit('dist',[variables.src.dist+variables.filter.all]);
});

gulp.task('build-watch', ['build'], buildWatch);

function buildWatch() {
  gulp.watch(variables.src.app+variables.filter.all, ['build']);
  gulp.watch('bower.json', ['build']);
  gulp.watch('package.json', ['build']);
}

gulp.task('build-styles', ['clean'], function () {
  return gulp.src(variables.src.SCSSParents)
    .pipe($.sass({
      sourceComments: 'map',
      // for some reason onError handler doesn't work in "build-styles" task,
      // but work in "serve-styles" task,
      // so "errLogToConsole: true" is the only known way of outputting error in "build-styles" task
      errLogToConsole: true,
      onError: common.onSCSSError
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'Firefox > 2'],
      cascade: false
    }))
    .pipe(gulp.dest(variables.src.tmp));
});

gulp.task('build-partials', ['clean'], function () {
  var indexFilter = $.filter('**/index.html');
  return gulp.src(variables.src.JADEAll)
    .pipe($.jade({pretty:true}))
    .pipe(indexFilter)
    .pipe(gulp.dest(variables.src.tmp))
    .pipe(indexFilter.restore())
    .pipe($.ignore.exclude('index.html'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: 'app',
      prefix: variables.src.components,
      declareModule: false
    }))
    .pipe($.count())
    .pipe(gulp.dest(variables.src.tmp + variables.src.components));
});

gulp.task('build-images', ['clean'], function () {
  return gulp.src(variables.src.images + variables.filter.all, {base:'src/'})
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(variables.src.dist));
});

gulp.task('build-fonts', ['clean'], function () {
	var fontsPaths = [
    variables.src.app + variables.src.fonts + variables.filter.all,
    variables.src.bowerComponents + 'fontawesome/fonts/' + variables.filter.fonts];
	var destPath = variables.src.dist + 'fonts/';

  var appFontsAndFontAwesome = gulp.src(fontsPaths)
    .pipe($.flatten())
    .pipe(gulp.dest(destPath));

	var bootstrapFonts = gulp.src(variables.src.bowerComponents + 'bootstrap-sass-official/assets/fonts/' + variables.filter.all)
    .pipe(gulp.dest(destPath));
  return $.merge(appFontsAndFontAwesome,bootstrapFonts);
});

gulp.task('clean', function (cb) {
  return $.del([variables.src.tmp, variables.src.dist], cb);
});

gulp.task('build-common', ['clean', 'build-styles', 'build-partials'], function () {
  var jsFilter = $.filter(variables.filter.js);
  var cssFilter = $.filter(variables.filter.css);
  var assets = $.useref.assets();
  return gulp.src([variables.src.tmp + 'index.html', variables.src.app + 'canvas.html'])
    .pipe($.wiredep({ //inject bower_components js+css
      //exclude: ['jeet.gs', 'animate.scss']
    }))
    .pipe($.inject(
      gulp.src(variables.src.appJS)
        .pipe($.naturalSort('asc'))
        .pipe($.angularFilesort()),
      {
        read: false,
        starttag: '<!-- inject:js -->',
        addRootSlash: false,
        addPrefix: '../'
      }))
    .pipe($.inject(
      gulp.src(variables.src.tmp + variables.src.components + variables.filter.js),
      {
        read: false,
        starttag: '<!-- inject:partials -->',
        addRootSlash: false,
        addPrefix: '../'
      }))
    .pipe($.inject(gulp.src(variables.src.tmp + '**/' + variables.filter.mainCss), {
      read: false,
      starttag: '<!-- inject:css -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    .pipe(assets)
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(variables.src.dist));
});




