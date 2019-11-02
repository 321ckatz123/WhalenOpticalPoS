// load configuration
require('dotenv').config()

// Include gulp
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
let cleanCSS = require('gulp-clean-css');

var del = require('del');

var distDir = '.dist';

gulp.task('sass_clean', function (cb) {
    return del([distDir + '/scss'], cb);
});
gulp.task('sass', gulp.series('sass_clean', function () {
    return gulp.src([
        'private/scss/app.scss'
    ])
        .pipe(require('gulp-sass')({
            includePaths: [
                'node_modules/foundation-sites/scss',
                'node_modules/bourbon/core']
        }))
        .pipe(require('gulp-autoprefixer')())
        .pipe(cleanCSS())
        .pipe(gulp.dest(distDir + '/css'));
}));

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');
    return gulp.src('private/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts_clean', function (cb) {
    return del([distDir + '/js'], cb);
});
gulp.task('scripts', gulp.series('scripts_clean', function () {
    //Put anything that is needed in order, then fill in the rest of the JS
    return gulp.src([
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-foundation/mm-foundation-tpls.js',
        'node_modules/moment/moment.js',
        'node_modules/lodash/lodash.js',
        'private/js/app.js',
        'private/js/filters/app.filters.js',
        'private/js/filters/Phone.js',
        'private/js/controllers/app.controllers.js',
        'private/js/controllers/IndexCtrl.js',
        'private/js/controllers/SearchCtrl.js',
        'private/js/controllers/SearchResultsCtrl.js',
        'private/js/controllers/PersonCtrl.js',
        'private/js/controllers/PersonCreateCtrl.js',
        'private/js/controllers/OrderCreateCtrl.js',
        'private/js/controllers/AddFrameToOrderCtrl.js'
    ])
        .pipe(concat('app.js'))
        //.pipe(replace(_gulpTokenReplaceOptions))
        //.pipe(gulpif(!env.isDev, require('gulp-strip-debug')()))
        //.pipe(gulpif(!env.isDev, require('gulp-uglify')({
        //    compress: true,
        //    mangle: true,
        //    output: {
        //        beautify: false
        //    }
        //})))
        .pipe(gulp.dest(distDir + '/js'))
}));

gulp.task('copy_public', function () {
    return gulp.src('public/**/*')
        .pipe(gulp.dest('.dist'))
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('private/scss/**/*.scss',  gulp.series('sass'));
    gulp.watch('private/js/**/*.js',  gulp.series('scripts'));
    gulp.watch('public/**/*',  gulp.series('copy_public'));
});

gulp.task('build', gulp.series('sass', 'scripts', 'copy_public'));

gulp.task('default', gulp.series('build', 'watch'));
