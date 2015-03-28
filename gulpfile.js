var gulp              = require('gulp'),
    // stylus             = require('gulp-stylus');
     concat            = require('gulp-concat');
     //filter                = require('gulp-filter');
     browserSync   = require('browser-sync'),
     files                = "./src/*.js";

// Cria task atraves do ´gulp.task´ e é nomeada de  'lint'
gulp.task('lint', function() {});

// Cria task dist
gulp.task('dist', function() {});

//Cria uma task que iniciara assim que o gulp rodar
gulp.task('default', function() {
    gulp.run('lint', 'dist');
    gulp.watch(files, function(evt) {
        gulp.run('lint', 'dist');
    });
});

/*
gulp.task('css', function () {
    var filter = Filter('"**"/*.styl');
    return gulp.src([
            './styles/stylus/**.styl',
            './styles/css/**.css'
        ])
        .pipe(filter)
        .pipe(stylus())
        .pipe(filter.restore())
        .pipe(concat('out.css'))
        .pipe(gulp.dest('./styles'));
});
*/
// inicia pelo localhost
gulp.task('browser-sync', function() {
    browserSync.init(['./views/**', '../assets/css/**'], {
        server: {
            baseDir: './',
            index: './views/index.html'
        }
    });
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('./assets/css/*.css');
});