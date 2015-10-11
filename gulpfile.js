const gulp = require('gulp');
const concat = require('gulp-concat');
const sequence = require('run-sequence').use(gulp);

const JS_APP_FILES = [
  'static/js/script.js'
];

const CSS_LIB_FILES = [
  'node_modules/normalize.css/normalize.css',
  'node_modules/highlight.js/styles/solarized_light.css'
];

const CSS_APP_FILES = [
  'static/css/default.css',
  'static/css/style.css'
];

gulp.task('default', function() {
  gulp.start('build');
});

gulp.task('build', function() {
  sequence('js:app', 'css:lib', 'css:app');
});

gulp.task('js:app', function() {

  const browserify = require('browserify');
  const babelify = require('babelify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');
  const uglify = require('gulp-uglify');

  return browserify({
    entries: JS_APP_FILES,
    extensions: ['.js']
  }).transform(babelify)
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('css:lib', function() {

  const csscomb = require('gulp-csscomb');
  const csso = require('gulp-csso');

  return gulp.src(CSS_LIB_FILES)
    .pipe(concat('lib.min.css'))
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('public/css'));
});

gulp.task('css:app', function() {

  const autoprefixer = require('gulp-autoprefixer');
  const csscomb = require('gulp-csscomb');
  const csso = require('gulp-csso');

  return gulp.src(CSS_APP_FILES)
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {

  gulp.watch(JS_APP_FILES, function() {
    gulp.start('js:app');
  });

  gulp.watch(CSS_APP_FILES, function() {
    gulp.start('css:app');
  });
});
