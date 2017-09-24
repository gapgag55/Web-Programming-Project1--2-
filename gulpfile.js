var gulp = require('gulp')
var jade = require('gulp-jade')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var pump = require('pump')
var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync')

var reload = browserSync.reload

gulp.task('default', ['jade', 'scss', 'js'], function() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })

  gulp.watch("./public/**/*").on('change', reload)
  gulp.watch("./src/jade/**/*.jade", ['jade'])
  gulp.watch("./src/scss/**/*.scss", ['scss'])
  gulp.watch("./src/js/*.js", ['js'])
})

gulp.task('js', function(cb) {
	pump([
				gulp.src('./src/js/*.js'),
				uglify(),
				concat('app.js'),
	    	gulp.dest('./public/js/'),
    ],
    cb
  );
})

gulp.task('jade', function() {
  gulp.src('./src/jade/**/*.jade')
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest('./public/'))
})

gulp.task('scss', function () {
    gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'));
});