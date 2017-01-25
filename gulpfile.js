const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
//const browserSync = _browserSync.create()
const autoprefix = require('gulp-autoprefixer')
//const reload = _browserSync.reload;
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const path = require('path');
const lazypipe = require('lazypipe');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

var gutil = require('gulp-util');
var uglify = require('gulp-uglify');

//var sass = require('gulp-ruby-sass');
var filter = require('gulp-filter');

var exec = require('child_process').exec;

var minifyCss = require('gulp-minify-css');

function minifyIfNeeded() {
    return gutil.env.env === 'prod'
        ? minify()
        : gutil.noop();
}

var paths = {
  styles:'./src/sass/**/*.+(sass|scss)',
  scripts:'src/js/**/*.+(js|jsx)',
  bootstrap:'./node_modules/bootstrap-sass/assets/',
  material : "./node_modules/materialize-css/",
  fontawesome:'./node_modules/font-awesome/',
  animatecss:"./node_modules/animate-sass/",
  jquery:'./node_modules/jquery/',
  images: './src/images/**/*.+(svg|png|jpeg|jpg)',
  html: './src/*.html',
  fonts: 'fonts/**/*'
}

var sassConfig = {
  style: "nested",
  includePaths :[
    //path.join(__dirname, paths.bootstrap , "/stylesheets/"),
    path.join(__dirname,paths.material,"/sass/"),
    path.join(__dirname,paths.fontawesome , "/scss/"),
    path.join(__dirname,paths.animatecss)
  ]
}


gulp.task('browserify', function () {
  var bundler = browserify('./src/js/main.js');

  bundler.transform('debowerify');
  bundler.transform('brfs');
  bundler.transform("babelify")
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('watchify', function() {
  watchify.args.debug = true;
  var bundler = watchify(browserify('./src/js/main.js', watchify.args));

  bundler.transform('debowerify');
  bundler.transform('brfs');
  bundler.transform("babelify", {presets: ["es2017","es2016"]})
  bundler.on('update', rebundle);
  bundler.on('log', gutil.log.bind(gutil));

  function rebundle() {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist'));
  }

  return rebundle();
});

gulp.task('browsersync', function() {
  browserSync.init({
    open: false,
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/app.sass')
        .pipe(sourcemaps.init())

        .pipe(sass(sassConfig).on('error', gutil.log ))
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: '.'}))
        .pipe(gulp.dest('./dist'))
        .pipe(minifyIfNeeded())
        //.pipe(gulp.dest('./src/css/'))
        .pipe(filter('**/*.css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch-sass', function () {
  return gulp.watch('src/sass/**/*.+(sass|scss)', ['sass']);
});

gulp.task('copy-fonts', function () {
  return gulp.src(['fonts/**/*',paths.fontawesome + "fonts/**.*", paths.bootstrap + "fonts/bootstrap/**.*"])
  //.pipe(gulp.dest('src/fonts/')) //for dev
  .pipe(gulp.dest('dist/fonts/'));
});
gulp.task("copy-templates",function(){
  return gulp.src("./src/*.html")
  .pipe(filter('**/*.html'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest("./dist"));
});
gulp.task("watch-templates",function() {
  return gulp.watch("./src/*.html",["copy-templates"])
})
gulp.task("copy-images",function(){
  return gulp.src("./src/images/**/*.+(svg|png|jpeg|jpg)")
  .pipe(filter('**/*.+(svg|png|jpeg|jpg)'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest("./dist/images"));
})
gulp.task("watch-images",function() {
  return gulp.watch("./src/images/**/*.+(svg|png|jpeg|jpg)",["copy-images"])
})
gulp.task('default', ['copy-fonts',"copy-templates","copy-images", 'sass', "watch-templates", "watch-images", 'watch-sass', 'watchify', 'browsersync']);
gulp.task('build', ['copy-fonts',"copy-templates","copy-images", 'sass', 'browserify']);
//found on https://gist.github.com/cobyism/4730490
gulp.task("deploy",["build"],function(cb){
  exec('git add dist && git commit -am "update remote" && git subtree push --prefix dist origin gh-pages', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
