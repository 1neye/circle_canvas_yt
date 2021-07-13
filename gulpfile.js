var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('sass', function(done) {
    gulp.src("app/scss/*.scss") // путь к sass файлам
        .pipe(plumber())    
        .pipe(sass())
        .pipe(gulp.dest("app/css/")) //папка для выгрузки css файлов
        .pipe(browserSync.stream());


    done();
});

gulp.task('serve', function(done) {

   browserSync.init({
        server: {
            baseDir: "app/"
        },
        files:['app/*.html','app/css/*.css', 'js/*.js']
    });
let filess = ['app/*.html','app/css/*.css', 'app/js/*.js']
    gulp.watch("app/scss/*.scss", gulp.series('sass'));
    gulp.watch(filess).on('change', () => {
      browserSync.reload();
      done();
    });
  

    done();
});

gulp.task('default', gulp.series('sass', 'serve'));



const minify = require('gulp-minify');
 
gulp.task('js', function() {
  gulp.src(['app/js/*.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist/'))
});

const cleanCSS = require('gulp-clean-css');
 
gulp.task('css', () => {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('css', 'js'));
