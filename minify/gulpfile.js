(function () {
    'use strict';

    var gulp       = require('gulp');
    var uglify     = require('gulp-uglify');
    var i18n       = require('gulp-html-i18n');
    var watch      = require('gulp-watch');
    var lazypipe   = require('lazypipe');
    var debug      = require('gulp-debug');
    var concat     = require('gulp-concat');
    var clean_css  = require('gulp-clean-css');

    // bases directories
    var bases = {
        app: 'app/app/',
        dist: 'app/public_html/',
    };

    // src directories
    var src = {
        scripts: ['scripts/jquery*.js', 'scripts/**/!(jquery)*.js'],
        html: '*.html',
        images: ['imagenes/**', 'iconos/**'],
        css: 'estilos/**/*.css',
    };

    /**
     * Pipelines per source type
     */
    var buildJS = lazypipe()
        .pipe(debug, {title: 'building js: '})
        .pipe(uglify)
        .pipe(concat, 'app.min.js')
        .pipe(gulp.dest, bases.dist + 'scripts/');

    var buildHTML = lazypipe()
        .pipe(debug, {title: 'building html: '})
        .pipe(i18n, {'langDir': 'app/locale', 'createLangDirs': true})
        .pipe(gulp.dest, bases.dist);

    var buildIMG = lazypipe()
        .pipe(debug, {title: 'building img: '})
        .pipe(gulp.dest, bases.dist);

    var buildCSS = lazypipe()
        .pipe(debug, {title: 'building css: '})
        .pipe(clean_css, {compatibility: 'ie8'})
        .pipe(concat, 'app.css')
        .pipe(gulp.dest, bases.dist + 'estilos/');
          

    /**
     * Build tasks per source type
     */
    gulp.task('buildJS', function() {
        gulp.src(src.scripts, {cwd: bases.app}).pipe(buildJS());
    });

    gulp.task('buildCSS', function() {
        gulp.src(src.css, {cwd: bases.app}).pipe(buildCSS());
    });

    gulp.task('buildHTML', function() {
        gulp.src(src.html, {cwd: bases.app}).pipe(buildHTML());
    });

    gulp.task('buildIMG', function() {
        gulp.src(src.images, {cwd: bases.app + '**'} ).pipe(buildIMG());
    });

    // metatask that groups all builds
    gulp.task('build', ['buildJS', 'buildHTML', 'buildIMG', 'buildCSS'], function() {

    });

    /**
     * Wath tasks
     */
    gulp.task('watch', function () {
        console.log('Watching for changes on source files');
        watch('scripts/**/*.js', {cwd: bases.app}, function() {
            gulp.src(src.scripts, {cwd: bases.app})
                .pipe(buildJS())
        });
        watch('estilos/**/*.css', {cwd: bases.app}, function() {
            gulp.src(src.css, {cwd: bases.app})
                .pipe(buildCSS())
        });
        watch(bases.app + src.html).pipe(buildHTML());
    });

    gulp.task('default', ['build', 'watch']);

}());
