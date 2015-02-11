/* ---- import packages for gulp ---- */
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass-ns'),
	minifycss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	//frontnote = require('gulp-frontnote'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	changed = require('gulp-changed'),
	browser = require('browser-sync'),
	reload = browser.reload,
	plumber = require('gulp-plumber'),
	browserify = require('browserify'),
	del = require('del'),
	reactify = require('reactify'),
	sequence = require('run-sequence'),
	source = require('vinyl-source-stream');

/* ---- css tasks ---- */
gulp.task('sass-compile', function() {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(autoprefixer())
    //.pipe(frontnote({css: './css/style.css'}))
    .pipe(sass({style:'compact'}))
    .pipe(changed('./dist/css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
});

gulp.task('sass-move', function() {
    return gulp.src('./dist/css/**/*.css')
    .pipe(plumber())
    .pipe(gulp.dest('./www/css'))
    .pipe(reload({stream:true}));
});

gulp.task('sass', function() {
    sequence('sass-compile', 'sass-move');
});

/* ---- js tasks ---- */   
gulp.task('react-compile', function(){
	return browserify(['./src/js/main.js'])
	.transform(reactify)
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./dist/js'))
});

gulp.task('js-compile', function(){
	gulp.src(['./dist/**/*.js'])
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('./www/'))
	.pipe(reload({stream:true}));
});

gulp.task('js', function() {
    sequence('react-compile', 'js-compile');
});

gulp.task('server', function(){
	return browser({
		notify: false,
		server:{
			baseDir:'./www/'
		}
	});
});

gulp.task('default', ['server'], function(){
	gulp.watch(['./www/**/*.html', './www/**/*.htm'])
	.on('change', function(file){
		gulp.src(file.path)
		.pipe(reload({stream:true}));
	});
	gulp.watch(['./src/scss/**/*.scss'], ['sass']);
	gulp.watch(['./src/js/**/*.js', './src/js/**/*.jsx'], ['js']);
});