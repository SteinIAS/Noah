var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

var paths = {
	assets: {
		js: 'js/',
		css: 'SASS/'
	},
	output: {
		js: '../site/scripts/',
		css: '../site/css/',
		img: '../site/img/'
	}
};

gulp.task('styles', function () {
	gulp.src('./sass/**/*.scss')
		.pipe(cssGlobbing({
			extensions: ['.css', '.scss']
		}))
		.pipe(sourcemaps.init())
			.pipe(sass({
				outputStyle: 'expanded'
			}))
		.pipe(sourcemaps.write())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('../site/css'));
});


gulp.task('scripts', function() {
	return gulp.src([paths.assets.js + 'plugins.js', paths.assets.js + 'script.js', paths.assets.js + 'dev.js'])
	    .pipe(jshint())
    	.pipe(jshint.reporter('jshint-stylish'))
    	.pipe(concat('script.js'))
    	.pipe(gulp.dest(paths.output.js));
});

gulp.task('default', function () {
	// Watch .js files
	gulp.watch(paths.assets.js + '**/*.js', ['scripts']);
	// Watch .scss files
	gulp.watch(paths.assets.css + '/**/*.scss', ['styles']);
});

gulp.task('lint', function() {
	return gulp.src('js/script.js')
	    .pipe(jshint())
    	.pipe(jshint.reporter('jshint-stylish'));
});