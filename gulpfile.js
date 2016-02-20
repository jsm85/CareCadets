var gulp = require('gulp');
var gutil = require('gulp-util');
var exec = require('child_process').exec;

gulp.task('main', function (cb) {
    exec('gulp deploy --gulpfile ./UI/gulpfile.js', function (error, stdout, stderr) {
        console.log(stdout);
        if (error) {
            console.log(error, stderr);
        }
    });
});