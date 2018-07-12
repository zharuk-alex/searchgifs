module.exports = function (gulp, plugins) {
  return function () {
    gulp.src('src/scss/**/*.scss')
      .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError("Error: <%= error.message %>"
      )}))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer(['last 2 versions'], {cascade: true}))
      .pipe(plugins.concat('bundle.min.css'))
      .pipe(plugins.cssnano())
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css/'))
      .pipe(plugins.browserSync.reload({ stream: true }))
  };
};
