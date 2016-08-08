var gulp = require('gulp');
var clean = require('gulp-clean');
var cleanhtml = require('gulp-cleanhtml');
var zip = require('gulp-zip');

//clean build directory
gulp.task('clean', function() {
	return gulp.src('build/*', { read: false })
		.pipe(clean());
});

//copy static folders to build directory
gulp.task('copy', function() {
  gulp.src('babel/*')
		.pipe(gulp.dest('build'));
  return gulp.src('src/manifest.json')
		.pipe(gulp.dest('build'));
});

//copy and compress HTML files
gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe(cleanhtml())
		.pipe(gulp.dest('build'));
});

// build
gulp.task('zip', ['html', 'copy'], function() {
	var manifest = require('./src/manifest'),
		distFileName = manifest.name + ' v' + manifest.version + '.zip';
	//build distributable extension
	return gulp.src(['build/**'])
		.pipe(zip(distFileName))
		.pipe(gulp.dest('dist'));
});
