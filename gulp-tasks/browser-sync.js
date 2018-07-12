module.exports = function(gulp, plugins) {
    return function() {
        plugins.browserSync.init({
          injectChanges: true,
          server: {
              baseDir: "dist"
          }
        });
    };
};
