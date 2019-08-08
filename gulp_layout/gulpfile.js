// Initialize modules
/*
npm install --save-dev gulp browser-sync gulp-sourcemaps gulp-autoprefixer gulp-cssnano gulp-postcss gulp-sass gulp-concat gulp-uglify gulp-replace gulp-babel @babel/core @babel/preset-env 
*/
const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps'); //soucemap
const sass = require('gulp-sass'); //sass
const cssnano = require('cssnano'); //minify css
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); //prefix css

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
let babel = require('gulp-babel');

const browserSync = require('browser-sync').create();

var replace = require('gulp-replace');

const devFolder = "./dev"; //developemnet foler
const distFolder = "./dist"; //distribution folder

// File paths
const files = {
  scssPath: devFolder + '/_scss/**/*.scss',
  cssLibPath: devFolder + '/_scss/lib/*.css',
  jsPath: devFolder + '/_js/*.js',
  jsLibPath: devFolder + '/_js/lib/*.js'
}

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest(distFolder + '/css')
    ); // put final CSS in dist folder
}
function cssLibTask() {
  return src([
    files.cssLibPath
  ])
    .pipe(concat('lib.css'))
    .pipe(dest(distFolder + '/css/lib')
    );
}
// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src([
    files.jsPath
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify({
      mangle: true
    }))
    .pipe(dest(distFolder + '/js')
    );
}
function jsLibTask() {
  return src([
    files.jsLibPath
  ])
    .pipe(concat('lib.js'))
    .pipe(dest(distFolder + '/js/lib')
    );
}

// Cachebust
var cbString = new Date().getTime();
function cacheBustTask() {
  return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(devFolder + '/_scss/**/*.scss').on('change', browserSync.reload);
  gulp.watch(devFolder + '/_js/**/*.js').on('change', browserSync.reload);
  gulp.watch('./**/*.html').on('change', browserSync.reload);

  watch([files.scssPath, files.jsPath, files.jsLibPath, files.cssLibPath],
    parallel(scssTask, jsTask, jsLibTask, cssLibTask));
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
  parallel(scssTask, jsTask, jsLibTask, cssLibTask),
  cacheBustTask,
  watchTask
);