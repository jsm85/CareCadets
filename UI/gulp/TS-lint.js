var gulp = require('gulp');
var tslint = require('gulp-tslint');
var stylish = require('gulp-tslint-stylish');

var sourceFiles = [
    'app/**/*.ts'
];

gulp.task('TS-lint', ['clean', 'sass'], function () {
    return gulp.src(sourceFiles)
      .pipe(tslint())
      .pipe(tslint.report(stylish));
});
