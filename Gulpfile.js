var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    cssnano         = require('gulp-cssnano'),
    jshint          = require('gulp-jshint'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    cache           = require('gulp-cache'),
    livereload      = require('gulp-livereload'),
    del             = require('del'),
    merge2          = require('merge2'),
    minifyHTML      = require('gulp-minify-html'),
    jasmine         = require('gulp-jasmine-phantom'),
    phantomjs       = require('phantomjs'),

    input  = {
        'css': 'src/scss/**/*.scss',
        'js': 'src/js/**/*.js',
        'img': 'src/img/**/*',
        'test': 'src/spec/**/*.spec.js',
        'html': 'src/html/**/*.html'
    },

    output = {
      'css': 'deploy/assets/css',
      'js': 'deploy/assets/js',
      'img': 'deploy/assets/img',
      'html': 'deploy/'
    };

gulp.task('clean', function() {
    return del([output.css, output.js, output.html]);
});

gulp.task('build-css', function() {
    return gulp.src(input.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('style.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest(output.css));
});

gulp.task('build-js', function() {
    return gulp.src(input.js)
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(output.js));
});

gulp.task('build-html', function() {
    return gulp.src(input.html)
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest(output.html));
});

gulp.task('build-img', function() {
    return gulp.src(input.img)
    .pipe(gulp.dest(output.img));
});

gulp.task('spec', function() {
  return gulp.src([input.js, input.test])
    .pipe(jasmine({
      integration: true,
      jasmineVersion: '2.3'
    }));
});

gulp.task('build-bower', function() {
    var jquery                  = gulp.src('src/bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('deploy/assets/js'));
    var bootstrap_js            = gulp.src('src/bower_components/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('deploy/assets/css'));
    var bootstrap_css           = gulp.src('src/bower_components/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest('deploy/assets/js'));
    var bootstrap_fonts         = gulp.src('src/bower_components/bootstrap/fonts/**/*.{ttf,woff,woff2,eof,svg}').pipe(gulp.dest('deploy/assets/fonts'));
    var font_awesome            = gulp.src('src/bower_components/font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}').pipe(gulp.dest('deploy/assets/fonts'));
    var font_awesome_css        = gulp.src('src/bower_components/font-awesome/css/font-awesome.min.css').pipe(gulp.dest('deploy/assets/css'));
    var html5shiv               = gulp.src('src/bower_components/html5shiv/dist/html5shiv.min.js').pipe(gulp.dest('deploy/assets/js'));
    var respond                 = gulp.src('src/bower_components/respond/src/respond.js').pipe(gulp.dest('deploy/assets/js'));
    var roboto                  = gulp.src('src/bower_components/roboto-fontface/fonts/**/*.{ttf,woff,woff2,eof,svg}').pipe(gulp.dest('deploy/assets/fonts/roboto'));

    return merge2(jquery, bootstrap_js, bootstrap_css, bootstrap_fonts, font_awesome, font_awesome_css, html5shiv, respond, roboto);
});

gulp.task('watch', function() {
    gulp.watch(input.js, ['build-js']);
    gulp.watch(input.scss, ['build-css']);
    gulp.watch(input.html, ['build-html']);
    gulp.watch(input.img, ['build-img']);
    livereload.listen();
});


gulp.task('default', ['build-js', 'build-css', 'build-html', 'build-img', 'build-bower']);