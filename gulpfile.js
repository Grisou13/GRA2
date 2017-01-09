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

var paths = {
  styles:'./src/sass/**/*.+(sass|scss)',
  scripts:'src/js/**/*.+(js|jsx)',
  bootstrap:'./node_modules/bootstrap-sass/assets/',
  material : "./node_modules/materialize-css/",
  fontawesome:'./node_modules/font-awesome/',
  jquery:'./node_modules/jquery/',
  images: './src/images/**/*.*',
  html: './src/**.html'
}

var sassConfig = {
  style:"nested",
  includePaths :[
    //path.join(__dirname, paths.bootstrap , "/stylesheets/"),
    path.join(__dirname,paths.material,"/sass/"),
    path.join(__dirname,paths.fontawesome , "/scss/")
  ]
}


gulp.task('browserify', function () {
  var bundler = browserify('./src/js/main.js');

  bundler.transform('debowerify');
  bundler.transform('brfs');
  bundler.transform("babelify", {presets: ["es2017","es2016"]})
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
  .on('error', gutil.log.bind(gutil, 'Sass Error'))
  //.pipe(sourcemaps.write())
        // for file sourcemaps
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: './src/sass'
        }))
    .pipe(sass(sassConfig))
    .pipe(gulp.dest('./dist'))
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
  return gulp.src("./src/images/*.+(svg|png|jpeg|jpg)")
  .pipe(filter('**/*.+(svg|png|jpeg|jpg)'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest("./dist/images"));
})
gulp.task("watch-images",function() {
  return gulp.watch("./src/images/*.+(svg|png|jpeg|jpg)",["copy-images"])
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
//console.log(sassConfig)
//js
// function compile(watch) {
//   var bundler = watchify(browserify('./src/index.js', { debug: true }).transform(babel));
//
//   function rebundle() {
//     bundler.bundle()
//       .on('error', function(err) { console.error(err); this.emit('end'); })
//       .pipe(source('build.js'))
//       .pipe(buffer())
//       .pipe(sourcemaps.init({ loadMaps: true }))
//       .pipe(sourcemaps.write('./'))
//       .pipe(gulp.dest('./src/js'));
//   }
//   functions sassiffy(){
//
//   }
//   if (watch) {
//     bundler.on('update', function() {
//       console.log('-> bundling...');
//       rebundle();
//     });
//   }
//
//   rebundle();
// }
//
// function watch() {
//   return compile(true);
// };
// gulp.task('scripts',function(){
//   return gulp.src([paths.jquery+"dist/jquery.min.js",paths.bootstrap + "/javascripts/bootstrap.min.js",paths.scripts])
//         .pipe(sourcemaps.init())
//         .pipe(browserify({
//           insertGlobals : true,
//           debug : true
//         }))
//         .pipe(babel({
//             presets: ['es2015','react']
//         }))
//
//         .pipe(concat('app.js'))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest("./src/js"))
//         .pipe(reload({match: '**/*.js',stream:true}));
// });
//
// //styles
// //icons
// gulp.task('fonts', function() { 
//     return gulp.src([paths.fontawesome + "fonts/**.*", paths.bootstrap + "fonts/bootstrap/**.*"]) 
//         .pipe(gulp.dest('./dist/fonts')); 
// });
// gulp.task("images", function(){
//   return gulp.src([paths.images]).pipe(gulp.dest("./dist/images"))
// })
// gulp.task('styles',["fonts"], function() {
//     return gulp.src(paths.styles)
//           .pipe(sourcemaps.init())
//           .pipe(sass(sassConfig))
//           .on('error', sass.logError)
//           .pipe(sourcemaps.write())
//           //.pipe(concat('app.css'))
//           .pipe(autoprefix('last 2 version'))
//           .pipe(gulp.dest('./src/app.css'))
//
//           .pipe(reload({match: '**/*.css',stream:true}));
// });
// gulp.task("build",function(){
//   let sassStream = gulp.src(paths.styles).pipe(sass(sassConfig));
//   let scriptStream = gulp.src([paths.jquery+"dist/jquery.min.js",paths.bootstrap + "/javascripts/bootstrap.min.js",paths.scripts])
//
//         .pipe(babel({
//             presets: ['es2015','react']
//         }))
//         .pipe(browserify({
//           insertGlobals : true,
//           debug : false
//         }))
//
//   return gulp.src(paths.html)
//         .pipe(useref({additionalStream : [sassStream,scriptStream]},lazypipe().pipe(sourcemaps.init, { loadMaps: true }) ))
//         .pipe(sourcemaps.write('maps'))
//         .pipe(gulp.dest("./dist"));
// });
//
// // Static Server + watching scss/html files
// gulp.task('serve', ['styles','scripts'], function() {
//
//     browserSync.init({
//         server: "./src"
//     });
//     gulp.watch("./src/*.html").on('change', browserSync.reload);
//     //gulp.watch([paths.styles,paths.scripts,paths.html,paths.images]).on('change', browserSync.reload);;
// });
// gulp.task("default",["styles","scripts"],function(){});
// //deafult task
// // gulp.task('default',['styles','fonts','scripts','html','images'],function() {
// //
// // });
