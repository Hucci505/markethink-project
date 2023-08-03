const gulp = require('gulp'),
  strip = require('gulp-strip-comments'),
  babel = require('gulp-babel'),
  sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('autoprefixer'),
  size = require('gulp-size'),
  notify = require('gulp-notify'),
  uglify = require('gulp-uglify'), // minify file
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css'), // remove all comments
  plumber = require('gulp-plumber'), // intercepts errors
  postCSS = require('gulp-postcss'),
  mqpacker = require('css-mqpacker'),
  sortCSSmq = require('sort-css-media-queries'),
  debug = require('gulp-debug');

const path = {
  scss: {
    src: ['./assets/scss/*.scss'],
    dest: './assets/css',
  },
  js: {
    src: [
      './assets/js/**/*.js',
      '!./assets/js/**/*.min.js',
      '!./assets/js/lib{,/**}/*.js',
    ],
    dest: './assets/js',
  },
};

const options = {
  mqpacker: { sort: sortCSSmq.desktopFirst },
  size: { title: 'Size' },
  rename: { suffix: '.min' },
  cleanCss: {
    level: { 2: { specialComments: 0, restructureRules: true } },
    compatibility: 'ie8',
  },
  autoprefixer: ['last 2 version', '> 2%', 'ie 6'],
  debug: { title: 'Focus:' },
  babel: { presets: ['@babel/env'] },
  sass: { outputStyle: 'compressed', includePaths: ['node_modules'] },
  onError: function (err) {
    this.emit('end');
    return notify().write(err);
  },
};

gulp.task('scripts', function () {
  return gulp
    .src(path.js.src)
    .pipe(debug(options.debug))
    .pipe(babel(options.babel))
    .pipe(uglify())
    .pipe(strip())
    .pipe(rename(options.rename))
    .pipe(gulp.dest(path.js.dest))
    .pipe(size(options.size));
});

gulp.task('scss', function () {
  return gulp
    .src(path.scss.src)
    .pipe(debug(options.debug))
    .pipe(sass(options.sass).on('error', options.onError))
    .pipe(cleanCSS(options.cleanCss))
    .pipe(postCSS([autoprefixer(options.autoprefixer), mqpacker(options.mqpacker)]))
    .pipe(rename({ ...options.rename, dirname: '' }))
    .pipe(gulp.dest(path.scss.dest))
    .pipe(size(options.size));
});


gulp.task('watch', async () => {
  gulp.watch(path.scss.src, gulp.series('scss'));
  gulp.watch(path.js.src, gulp.series('scripts'));
});

gulp.task('default', gulp.series('watch'));
