var gulp = require('gulp');
var tsc = require('gulp-typescript');
var concat = require('gulp-concat');
var rename = rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rjs = require('gulp-requirejs');

gulp.task('optimize', ['clean', 'sass', 'TS-lint', 'TS-dev'], function () {
    rjs({
        name: 'main',
        baseUrl: 'dist/js',
        out: 'carecadets.min.js'
    })
    .pipe(gulp.dest('dist/js'));
});
