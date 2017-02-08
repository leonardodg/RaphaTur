const gulp    = require('gulp');
var   jshint  = require('gulp-jshint'),
	  uglify  = require('gulp-uglify'),
	  clean   = require('gulp-clean'),
	  concat  = require('gulp-concat'),
	  rename  = require("gulp-rename"),
	  cssmin  = require('gulp-clean-css'),
	  htmlmin = require('gulp-htmlmin'),
  runSequence = require('run-sequence');

var build = function(callback) {
				  runSequence(['lint','clean'],
				              [ 'concat-js-min', 'concat-js-local','htmlmin-main', 'htmlmin-services', 'minify-css', 'copy-fonts'],
				              callback);
			};

gulp.task('clean', function () {
    return gulp.src('src/', {read: false})
        	   .pipe(clean());
});

gulp.task('copy-fonts', function() {
  return gulp.src('fonts/*')
    		 .pipe(gulp.dest('src/fonts/'));
});

gulp.task('htmlmin-services', function() {
  	return gulp.src('services/*.html')
    		   .pipe(htmlmin({collapseWhitespace: true}))
    		   .pipe(gulp.dest('src/services'));
});

gulp.task('htmlmin-main', function() {
  	 return gulp.src('*.html')
    			.pipe(htmlmin({collapseWhitespace: true}))
    			.pipe(gulp.dest('src/'));
});

gulp.task('concat-css', function() {
  return gulp.src([ 'css/bootstrap.min.css', 'css/main.css', 'css/font-awesome.min.css', ])
    		 .pipe(concat('style.css'))
    		 .pipe(gulp.dest('css'));
});

gulp.task('minify-css', ['concat-css'],function() {
  return gulp.src('css/style.css')
    		 .pipe(cssmin({compatibility: 'ie8'}))
    		 .pipe(gulp.dest('src/css'));
});

/* Buscar Erros */
gulp.task('lint', function() {
  return gulp.src('./js/script.js')
    	     .pipe(jshint())
    		 .pipe(jshint.reporter('default'));
});

/* JS Minification */
gulp.task('uglify', function() {
  return gulp.src('./js/script.js')
		     .pipe(uglify())
		     .pipe(rename('script.min.js'))
		     .pipe(gulp.dest('./js/'));
});

gulp.task('concat-js-local', function() {
	return gulp.src(['js/jquery-1.11.3.js','js/jquery.validate.js','js/bootstrap.js', 'js/script.js'])
    	       .pipe(concat('all.js'))
    		   .pipe(gulp.dest('./js/'));
});

gulp.task('concat-js-min', ['uglify'], function() {
	return gulp.src(['js/jquery-1.11.3.min.js','js/jquery.validate.min.js','js/bootstrap.min.js', 'js/script.min.js', 'js/analytics.js'])
    	       .pipe(concat('all.js'))
    		   .pipe(gulp.dest('./src/js/'));
});

gulp.task('build', build);
gulp.task('default', build);