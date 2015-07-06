// 2015.07.06 Yutaka Kachi
// npm install gulp
// npm install --save-dev gulp-concat gulp-uglify gulp-cssmin

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

// JS task
gulp.task('js', function () {
  gulp.src('./js/src/*.js')
    .pipe(concat('mameblock.src.js'))
    .pipe(gulp.dest('./js')); 
});

gulp.task('js_min', function () {
  gulp.src('./js/mameblock.src.js')
    .pipe(concat('mameblock.min.js'))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./js')); 
});

// CSS task
gulp.task('css', function () {
    gulp.src('./css/src/*.css')
		.pipe(concat('mameblock.src.css'))
        .pipe(gulp.dest('./css')); 
});

gulp.task('css_min', function () {
    gulp.src('./css/mameblock.src.css')
		.pipe(concat('mameblock.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./css')); 
});

// default task
gulp.task('default', ['js', 'js_min', 'css', 'css_min']);