const autoprefixer = require('gulp-autoprefixer');
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync');
// const buffer = require('vinyl-buffer');
const cache = require('gulp-cache');
// const clean = require('gulp-clean');
const concat = require('gulp-concat');
// const cssmin = require('gulp-cssmin');
const cssnano = require('gulp-cssnano');
// const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const notify = require("gulp-notify");
const plumber = require('gulp-plumber');
const pngquant = require('imagemin-pngquant');
const reload = browserSync.reload;
const sass = require('gulp-sass');
// const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const plugins = require('gulp-load-plugins')({pattern: '*'});



function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

gulp.task('browser-sync', getTask('browser-sync'));
gulp.task('scripts', getTask('scripts'));
gulp.task('sass', getTask('sass'));
gulp.task('images', getTask('images'));
gulp.task('html', function () {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({ stream: true }))
});
gulp.task('libs', getTask('libs'));


gulp.task('watch', ['html','browser-sync','sass', 'scripts', 'images'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/images/**/*', ['images']);
	gulp.watch('src/**/*.html',['html']);
});

gulp.task('default', ['watch']);
