var libs = {
  jquery: {
    js: 'node_modules/jquery/dist/jquery.js'
  },
  imagesLoaded:{
    js: 'node_modules/imagesloaded/imagesloaded.pkgd.js'
  },
  masonry:{
    js: 'node_modules/masonry-layout/dist/masonry.pkgd.js'
  }
};

var js_libs = Object.keys(libs).map(function(key, index) {
  return (libs[key].hasOwnProperty('js'))?libs[key].js:'';
},[]).concat(['src/libs/js/**/*.js']);

module.exports = function(gulp, plugins) {
  return function() {
    gulp.src(js_libs)
      .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError("Error: <%= error.message %>")
      }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.uglify())
      .pipe(plugins.concat('bundle-libs.min.js'))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest('dist/libs/'))
      .pipe(plugins.browserSync.reload({ stream: true }));
  }
}
