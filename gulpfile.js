var gulp     = require('gulp');
var concat   = require('gulp-concat');
var sequence = require('run-sequence').use(gulp);

 var JS_APP_FILES = [
  'static/js/ga.js',
  'static/js/script.js'
];

var CSS_LIB_FILES = [
  'bower_components/normalize.css/normalize.css',
  'bower_components/highlight.js/src/styles/solarized_light.css'
];

var CSS_APP_FILES = [
  'static/css/default.css',
  'static/css/style.css'
];

gulp.task('default', function () {
  gulp.start('build');
});

gulp.task('build', function () {
  sequence('js:app', 'css:lib', 'css:app');
});

gulp.task('js:app', function () {

  var uglify = require('gulp-uglify');

  gulp.src(JS_APP_FILES)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('_public/js'));
});

gulp.task('css:lib', function () {

  var csscomb = require('gulp-csscomb');
  var csso    = require('gulp-csso');

  gulp.src(CSS_LIB_FILES)
    .pipe(concat('lib.min.css'))
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('_public/css'));
});

gulp.task('css:app', function () {

  var csscomb = require('gulp-csscomb');
  var csso    = require('gulp-csso');

  gulp.src(CSS_APP_FILES)
    .pipe(concat('app.min.css'))
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('_public/css'));
});

gulp.task('watch', function () {

  gulp.watch(JS_APP_FILES, function () {
    gulp.start('js:app');
  });

  gulp.watch(CSS_APP_FILES, function () {
    gulp.start('css:app');
  });
});