require('dotenv').config()
const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const port = process.env.PORT || 4000

gulp.task('browser-sync', () => {
  browserSync.init({
    proxy: `localhost:${port}`
  });
});

gulp.task('sass', () => {
  return gulp.src('./src/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', () => {
  browserSync.init({
    proxy: `localhost:${port}`
  });
  // Watchers
  gulp.watch('./src/**/*.scss', gulp.series('sass'));
  gulp.watch('./views/**/*.hbs', browserSync.reload);
});