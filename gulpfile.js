var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var streamify   = require('gulp-streamify');
var gulpif      = require('gulp-if');
var connect     = require('gulp-connect');
var plumber     = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var env =process.env.NODE_ENV || 'development';
var outputDir = 'dist';

gulp.task('js', function () {
    return browserify('./src/assets/scripts/main', { debug: env === 'development' })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulpif(env === 'production', streamify(uglify())))
        .pipe(gulp.dest(outputDir + '/js'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    return gulp.src('./src/assets/styles/*.css')
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest(outputDir + '/assets/styles'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    return gulp.src('./src/index.html')
        // Perform minification tasks, etc here
        .pipe(minifyHTML())
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    return gulp.src('src/assets/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(outputDir + '/assets/images'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/assets/scripts/*.js', ['js']);
    gulp.watch('src/assets/styles/*.css', ['css']);
});

gulp.task('connect', function () {
    connect.server({
        root: [outputDir],
        livereload: true
    });
});

gulp.task('default', ['js', 'html', 'css', 'watch', 'connect']);