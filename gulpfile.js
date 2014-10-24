// load configuration
var dotenv = require('dotenv');
dotenv.load();

// Include gulp
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var del = require('del');

var distDir = '.dist';

gulp.task('sass_clean', function (cb) {
    del([distDir + '/scss'], cb);
});
gulp.task('sass', ['sass_clean'], function () {
    return gulp.src('private/scss/app.scss')
        .pipe(require('gulp-sass')({
            includePaths: [
                'bower_components/foundation/scss',
                'bower_components/bourbon/dist']
        }))
        .pipe(require('gulp-autoprefixer')())
        .pipe(require('gulp-minify-css')())
        .pipe(gulp.dest(distDir + '/css'));
});

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');
    return gulp.src('private/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['lint'], function () {
    //Put anything that is needed in order, then fill in the rest of the JS
    return gulp.src([
        'bower_components/console-polyfill/index.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-foundation/mm-foundation-tpls.js',
        'node_modules/swagger-client/lib/shred.bundle.js',
        'node_modules/swagger-client/lib/swagger.js',
        'bower_components/queue-async/queue.js',
        'bower_components/moment/moment.js',
        'private/js/services/app.services.js',
        'private/js/controllers/app.controllers.js',
        'private/js/directives/app.directives.js',
        'private/js/**/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(replace(_gulpTokenReplaceOptions))
        .pipe(gulpif(!env.isDev, require('gulp-strip-debug')()))
        .pipe(gulpif(!env.isDev, require('gulp-uglify')({
            compress: true,
            mangle: true,
            output: {
                beautify: false
            }
        })))
        .pipe(gulp.dest(distDir + '/js'))
});

gulp.task('copy_public', function () {
    gulp.src('public/**/*')
        .pipe(gulp.dest('.dist'))
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('private/scss/**/*.scss', ['sass']);
});

gulp.task('deploy', ['sass', 'copy_public']);

gulp.task('default', ['deploy', 'watch']);
