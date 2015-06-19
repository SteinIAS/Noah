var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var autoprefix = require('gulp-autoprefixer');

var paths = {
	assets: {
		js: 'js/',
		css: 'SASS/',
		html: '../site/'
	},
	output: {
		js: '../site/scripts/',
		css: '../site/css/',
		img: '../site/img/'
	}
};

gulp.task('styles:dev', function () {
	gulp.src('./sass/**/*.scss')
		.pipe(cssGlobbing({
			extensions: ['.css', '.scss']
		}))
		.pipe(sourcemaps.init())
			.pipe(sass({
				outputStyle: 'expanded'
			}))
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefix('last 2 version', 'ie9'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('../site/css'))
		.pipe(browserSync.stream());
});

gulp.task('styles:deploy', function () {
	gulp.src('./sass/**/*.scss')
		.pipe(cssGlobbing({
			extensions: ['.css', '.scss']
		}))
		.pipe(sourcemaps.init())
			.pipe(sass({
				outputStyle: 'expanded'
			}))
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefix('last 2 version', 'ie9'))
		.pipe(sourcemaps.write())
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('../site/css'))
		.pipe(browserSync.stream());
});

gulp.task('scripts:dev', function() {
	return gulp.src([paths.assets.js + 'plugins.js', paths.assets.js + 'script.js', paths.assets.js + 'dev.js'])
	    .pipe(jshint())
    	.pipe(jshint.reporter('jshint-stylish'))
    	.pipe(sourcemaps.init())
    		.pipe(concat('script.js'))
    	.pipe(sourcemaps.write())
    	.pipe(gulp.dest(paths.output.js));
});

gulp.task('templates', function() {
	return browserSync.reload();
});

gulp.task('default', ['scripts:dev', 'styles:dev'], function () {
	browserSync.init([paths.output.js + '**/*.js'], {
        server: "../site"
    });
	// Watch .js files
	gulp.watch(paths.assets.js + '**/*.js', ['scripts:dev']);
	// Watch .scss files
	gulp.watch(paths.assets.css + '/**/*.scss', ['styles:dev']);
	// Watch .html files
	gulp.watch(paths.assets.html + '**/*.html', ['templates']);

});

gulp.task('deploy', ['styles:deploy'], function(){});