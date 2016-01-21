var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

gulp.task('default',function(){
	//tasks
});


gulp.task('sass',function(){
	return gulp.src('src/styles/main.scss')
	.pipe(sass({style: 'compressed'}))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest('dist/assets/css'))
});


/***************************************
                STYLES
***************************************/

gulp.task('styles',function(){
    return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});


/***************************************
                SCRIPTS
***************************************/

gulp.task('scripts',function(){
    return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
}); 




/***************************************
                IMAGES
***************************************/

gulp.task('images',function(){
    return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    /*.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))*/
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});


/***************************************
                CLEAN
***************************************/

gulp.task('clean', function() {  
  return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], {read: false})
    .pipe(clean());
});



/***************************************
             DEFUALT TASK
***************************************/

gulp.task('default', ['clean'], function() {  
    gulp.start('styles', 'scripts', 'images');
});


/***************************************
            WATCH/MONITOR
***************************************/

gulp.task('watch', function() {

  // watch all .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // watch all js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // watch all images files
  gulp.watch('src/images/**/*', ['images']);


  // live reload server
  var server = livereload();

  // watch all the files under dist folder
  gulp.watch(['dist/**']).on('change', function(file) {
    server.changed(file.path);
  });

});

