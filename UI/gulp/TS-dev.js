var gulp = require('gulp');
var tsc = require('gulp-typescript');
var concat = require('gulp-concat');
var rename = rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var libFiles = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/materialize/dist/js/materialize.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/angular-touch/angular-touch.js',
    'dist/pixi.js',
    'dist/pixi-spine.js'
];

var sourceFiles = [
    'app/**/*.ts',
    'typings/**/*.ts',
    'app/app.ts'
];

gulp.task('TS-dev', ['clean', 'sass', 'TS-lint'], function () {
    
    gulp.src(libFiles)
        .pipe(concat('vendor'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
            
    return gulp.src(sourceFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc({
            target: 'ES5',
            module: "AMD",
            emitError: false,
            noExternalResolve: true,
        }))
		.pipe(gulp.dest('dist/js'));
});