var gulp = require('gulp'),
    rimraf = require('gulp-rimraf');

var sourceFiles = [
    './dist/js/*/**/*.js'
];

gulp.task('clean', function () {
    return gulp.src(sourceFiles, { read: false })
      .pipe(rimraf());
});