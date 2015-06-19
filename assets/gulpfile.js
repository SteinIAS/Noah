var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var autoprefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var paths = {
	assets: {
		js: 'js/',
		css: './SASS/',
		html: '../site/'
	},
	output: {
		js: '../site/scripts/',
		css: '../site/css/',
		img: '../site/img/'
	}
};

gulp.task('styles:dev', function () {
	gulp.src(paths.assets.css + '**/*.scss')
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
		.pipe(gulp.dest(paths.output.css))
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
		.pipe(gulp.dest(paths.output.css))
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

gulp.task('scripts:deploy', function() {
	return gulp.src([paths.assets.js + 'plugins.js', paths.assets.js + 'script.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.output.js));
});

gulp.task('templates', function() {
	return browserSync.reload();
});

gulp.task('images', function() {
  return gulp.src(paths.output.img + '**/*')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest(paths.output.img));
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

gulp.task('deploy', ['scripts:deploy', 'styles:deploy', 'images']);