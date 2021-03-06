var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
/*    autoprefixer = require('gulp-autoprefixer'),*/
    concatCss = require('gulp-concat-css'),
    gulpcompass = require('gulp-compass'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    path = require('path'),
    rjs = require('gulp-requirejs'),
    amdOptimize =  require('amd-optimize');


var config = {
    srcPath : {
        scssSrcPath : 'src/styles/*.scss'
    },
    destPath : {
        scssDestPath : 'dist/assets/css'
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
    .pipe(concatCss('changes.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('cssbuild', function(){
    return gulp.src(['src/styles2/*.css','dist/assets/css/*.css'])
        .pipe(concatCss('final.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({message:'cssbuild task complete'}))
});

gulp.task('compasscompile',function(){
    gulp.src(config.srcPath.scssSrcPath)
    .pipe(compass({
        css: 'dist/assets/css',
        sass: 'dist/assets/sass'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/temp'));
})

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


gulp.task('requirejsBuild', function(){
    rjs({
        baseUrl: 'src/scripts/**/*.js',
        out:'output.js',
        shim:{

        }
    })
        .pipe(gulp.dest('dist/assets/js')); //pipe it to the output DIR
})


gulp.task('optimize',function(){
    return gulp.src('src/scripts/**/*.js')
        .pipe(amdOptimize("index"))
        .pipe(concat("index.js"))
        .pipe(gulp.dest("dist/assets/js"));
})



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

