module.exports = function(gulp, plugins) {
  return function() {
    gulp.src('./src/images/**/*')
    .pipe(plugins.cache(plugins.imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [
        {
          removeViewBox: false
        }
      ],
      use: [plugins.pngquant]
    })))
    .pipe(gulp.dest('./dist/images'))
    .pipe(plugins.browserSync.reload({ stream: true }));
  }
}
