var gulp = require('gulp'),
    gutil = require ('gulp-util'),
    coffee = require ('gulp-coffee'), 
    concat = require ('gulp-concat'),
    compass = require ('gulp-compass'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    path = require('path'),
    browserify = require('gulp-browserify');
    
    
var coffeeScripts = ['components/coffee/tagline.coffee'];
var jsSources = [
        'components/scripts/rclick.js',
        'components/scripts/pxgrid.js',
        'components/scripts/tagline.js',
        'components/scripts/template.js'
];


gulp.task('coffee', function(){
    gulp.src(coffeeScripts)
    .pipe(coffee({bare:true})
    .on('error',gutil.log))
    .pipe(gulp.dest('components/scripts'))
    });


gulp.task('js', function(){
        gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
        livereload.listen();
});

gulp.task('compass', function() {
  gulp.src('components/sass/style.scss')
    .pipe(compass({
      sass: 'components/sass',
      image: 'builds/development/images',
      style: 'expanded'
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('builds/development/css'))
    livereload.listen();
});

gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('builds/development/'))
    .pipe(livereload());
});

gulp.task('html', function(){
    gulp.src('builds/development/*.html')
    livereload.listen();
});


gulp.task('json', function(){
    gulp.src('builds/development/*.json')
    livereload.listen();
});


gulp.task('watch', function() {
    gulp.watch('components/coffee/tagline.coffee',['coffee']);
    gulp.watch('components/scripts/*.js',['js']);
    gulp.watch('components/sass/*.scss',['compass']);
    gulp.watch('less/*.less', ['less']);
    gulp.watch('builds/development/*.html',['html']);
    gulp.watch('builds/development/*.json',['json']);
});


gulp.task('default',['html','json','coffee','js','compass','less','watch']);