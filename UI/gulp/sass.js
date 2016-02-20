var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

gulp.task('sass', function() {               
    return gulp.src('app/style.scss')
        .pipe(sass({ errLogToConsole: true }))
        .pipe(minifyCSS())
        .pipe(rename('carecadets.min.css'))
        .pipe(gulp.dest('dist/css'));
});