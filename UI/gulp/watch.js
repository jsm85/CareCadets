var gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('watch', function() {
    gulp.watch('app/**/*.ts', ['clean', 'TS-lint', 'TS-dev']);
    gulp.watch('app/**/*.scss', ['sass']);
});
