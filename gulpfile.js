var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var tailwindcss = require('tailwindcss');
var purgecss = require('gulp-purgecss');




gulp.task('purgecss', function () {

    return gulp.src(['./main.css'])    
        .pipe(postcss([
            tailwindcss('./tailwind.js'),
        ]))
        .pipe(purgecss({
            content: ["index.html"],
            extractor: class TailwindExtractor {
                static extract(content) {
                    return content.match(/[A-z0-9-:\/]+/g) || [];
                }
              } 
        }))
        .pipe(concat('purge.min.css'))
        .pipe(gulp.dest('./build/css'));
});


gulp.task('notpurgecss', function () {

    return gulp.src(['./main.css'])
        .pipe(postcss([
            tailwindcss('./tailwind.js'),
        ]))
        .pipe(concat('not-purge.min.css'))
        .pipe(gulp.dest('./build/css'));
});


gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['html', 'notpurgecss', 'purgecss'], function(){});