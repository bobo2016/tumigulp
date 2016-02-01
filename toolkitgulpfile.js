var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    concatCss = require('gulp-concat-css'),
    compass = require('gulp-compass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    path = require('path');

var config = {
        compass:{
                config: 'config.rb'
        },
        srcPath:{
                cssPath:'../../../cvaccplusstorefront/web/webroot/_ui/desktop/theme-black/css',
                sassPath: 'sass',
                headerCssPath: ['../../../cvaccplusstorefront/web/webroot/_ui/addons/searchandizing/desktop/theme-black/css/searchandizing.css','../../../cvaccplusstorefront/web/webroot/_ui/desktop/theme-black/css/normalize.min.css','../../../cvaccplusstorefront/web/webroot/_ui/desktop/common/css/jquery.*.css'],
                combinedCssPath:['../../../cvaccplusstorefront/web/webroot/_ui/desktop/theme-black/css/header-vendor.css','../../../cvaccplusstorefront/web/webroot/_ui/desktop/theme-black/css/changes.css']
        }

}

gulp.task('test',function(){});

/****************************
           COMPASS
*****************************/
gulp.task('compass',function(){
        gulp.src('sass/*.scss')
        .pipe(compass({
            config_file: config.compass.config,
            css:config.srcPath.cssPath, 
            sass:config.srcPath.sassPath
        }))
        .pipe(gulp.dest(config.srcPath.cssPath))

});

/***************************
          HeaderCSS
****************************/
gulp.task('headerCssHandler',function(){
        gulp.src(config.srcPath.headerCssPath)
        .pipe(concatCss('header-vendor.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(config.srcPath.cssPath))
});



/****************************
           SCRIPT
*****************************/
gulp.task('script',function(){

});

gulp.task('cssbuild',function(){

});