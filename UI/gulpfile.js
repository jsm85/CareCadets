var gulp = require('gulp'),
    requireDir = require('require-dir');

requireDir('./gulp');

//----- Tasks -----
gulp.task('default', ['clean', 'sass', 'optimize', 'watch']);
gulp.task('deploy', ['clean', 'sass', 'optimize']);

