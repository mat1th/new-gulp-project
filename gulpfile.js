// Load plugins
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cssnano = require('gulp-cssnano'),
    browserSync = require('browser-sync');

// Default task
gulp.task('default', function () {
    gulp.start('styles', 'scripts');
});

// Styles
gulp.task('styles', function (cb) {
    gulp.src(['src/js/*.css'])
        .pipe(concat('main.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
});

// Scripts
gulp.task('scripts', function (cb) {
    gulp.src('src/js/*.js')
        .pipe(concat('weatherApp.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

// Watch task
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/*.css', ['styles']);
    // Watch .js files
    gulp.watch('./src/js/*.js', ['scripts']);
    // Create LiveReload server
    gulp.watch({
        glob: 'dist/**'
    }, [browserSync.reload]);
});
