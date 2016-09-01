const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const csscomb = require('gulp-csscomb');
const csso = require('gulp-csso');

const CSS_APP_FILES = [
  'static/css/app.css',
  'static/css/settings.css',
  'static/css/tools.css',
  'static/css/generic.css',
  'static/css/base.css',
  'static/css/objects.css',
  'static/css/components.css',
  'static/css/trumps.css'
];

gulp.task('build', () => gulp.start('css:app'));

gulp.task('css:app', () => {
  return gulp.src(CSS_APP_FILES)
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
  gulp.watch(CSS_APP_FILES, () => gulp.start('css:app'));
});
