var gulp = require('gulp'),
  jshint = require('gulp-jshint');

gulp.task('lint', function() {
  gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});



