// 2015.06.25 Yutaka Kachi
// npm install --save-dev gulp-concat gulp-uglify gulp-cssmin

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

// JS task
gulp.task('js', function () {
  console.log('--------- js task ----------');
  gulp.src('./js/src/*.js')
    .pipe(concat('mameblock.min.js'))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./js')); 
});

// CSS task
gulp.task('cssmin', function () {
    console.log('--------- cssmin task ----------');
    gulp.src('./css/src/*.css')
		.pipe(concat('mameblock.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./css')); 
});

// default task
gulp.task('default', ['js', 'cssmin']);