const gulp = require('gulp');
const sass = require('gulp-sass');
const _browserSync = require('browser-sync');
const browserSync = _browserSync.create()
const autoprefix = require('gulp-autoprefixer')
const reload = _browserSync.reload;
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const path = require('path');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

var paths = {
  styles:'./src/sass/**/*.+(sass|scss)',
  scripts:'src/js/**/*.+(js|jsx)',
  bootstrap:'./node_modules/bootstrap-sass/assets/',
  fontawesome:'./node_modules/font-awesome/',
  jquery:'./node_modules/jquery/',
  images: './src/images/**/*.*',
  html: './src/**.html'
}
var sassConfig = {
  style:"nested",
  includePaths :[
    path.join(__dirname, paths.bootstrap , "/stylesheets/"),
    path.join(__dirname,paths.fontawesome , "/scss/")
  ]
}
//console.log(sassConfig)
//js
gulp.task('scripts',function(){
  return gulp.src([paths.jquery+"dist/jquery.min.js",paths.bootstrap + "/javascripts/bootstrap.min.js",paths.scripts])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015','react']
        }))
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./dist/js"))
        .pipe(reload({match: '**/*.js',stream:true}));
});

//styles
gulp.task('styles',["fonts"], function() {
    return gulp.src(paths.styles)
          .pipe(sourcemaps.init())
          .pipe(sass(sassConfig))
          .on('error', sass.logError)
          .pipe(sourcemaps.write())
          .pipe(concat('app.css'))
          .pipe(gulp.dest('./dist/css/'))
          .pipe(autoprefix('last 2 version'))
          .pipe(reload({match: '**/*.css',stream:true}));
});


//icons
gulp.task('fonts', function() { 
    return gulp.src([paths.fontawesome + "fonts/**.*", paths.bootstrap + "fonts/bootstrap/**.*"]) 
        .pipe(gulp.dest('./dist/fonts')); 
});
gulp.task("images", function(){
  return gulp.src([paths.images]).pipe(gulp.dest("./dist/images"))
})
gulp.task("html", function(){
  return gulp.src('src/*.html').pipe(gulp.dest('./dist'));
})
// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch([paths.scripts,paths.styles,paths.html,paths.images],['styles','scripts','html']);
});
//browser sync
gulp.task("server-reload",["html","images"],function(done){
  browserSync.reload();
  done();
})
// Static Server + watching scss/html files
gulp.task('serve', ['styles','scripts'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch([paths.styles,paths.scripts,paths.html,paths.images]).on('change', browserSync.reload);;
});
//deafult task
gulp.task('default',['styles','fonts','scripts','html','images'],function() {

});
