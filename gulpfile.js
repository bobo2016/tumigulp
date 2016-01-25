var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
/*    autoprefixer = require('gulp-autoprefixer'),*/
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


var config = {
    srcPath : {
        scssSrcPath : ['src/styles/*.scss'],
        cleanPath: ['dist/assets/css','dist/assets/js']
    },
    destPath : {
        scssDestPath : ['dist/assets/css']
    }
}


/*gulp.task('default',function(){
	//tasks
});*/

/***************************************
                STYLES
***************************************/

gulp.task('styles',function(){
    return sass(config.srcPath.scssSrcPath,{style: 'expanded'})
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
  return gulp.src(['dist/assets/css', 'dist/assets/js'], {read: false})
    .pipe(clean());
});



/***************************************
             DEFUALT TASK
***************************************/

gulp.task('default', ['clean'], function() {  
    gulp.start('styles', 'scripts');
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

