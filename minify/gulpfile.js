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
    var jsonminify = require('gulp-jsonminify');
    var jsoneditor = require('gulp-json-editor');
    var template   = require('gulp-nunjucks-render');
    var debugStreams  = require('gulp-debug-streams');

    // bases directories
    var bases = {
        app: 'app/app/',
        dist: 'app/public_html/',
        locale: 'app/locale/',
    };

    // src directories
    var src = {
        scripts: ['scripts/jquery*.js', 'scripts/**/!(jquery)*.js'],
        html: '*.html',
        images: ['imagenes/**', 'iconos/**'],
        css: 'estilos/**/*.css',
        static_assets: ['**/.htaccess', '**/*.php'],
        json: '**/i18n.json',
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
        .pipe(template, {path: 'app/app', noCache: true, envOptions: {tags: {variableStart: '<$', variableEnd: '$>'}}})
        .pipe(i18n, {'langDir': bases.locale, 'createLangDirs': true})
        .pipe(gulp.dest, bases.dist);

    var buildIMG = lazypipe()
        .pipe(debug, {title: 'building img: '})
        .pipe(gulp.dest, bases.dist);

    var buildCSS = lazypipe()
        .pipe(debug, {title: 'building css: '})
        .pipe(clean_css, {compatibility: 'ie8'})
        .pipe(concat, 'app.css')
        .pipe(gulp.dest, bases.dist + 'estilos/');

    var copyStaticAssets = lazypipe()
        .pipe(debug, {title: 'static asset: '})
        .pipe(gulp.dest, bases.dist);

    var buildJSON = lazypipe()
        .pipe(debug, {title: 'building json: '})
        .pipe(jsoneditor, function(json) {
            return json.galeria;
        })
        .pipe(jsonminify)
        .pipe(gulp.dest, bases.dist);

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

    gulp.task('copyStaticAssets', function () {
        gulp.src(src.static_assets, {cwd: bases.app}).pipe(copyStaticAssets());
    });

    gulp.task('buildJSON', function() {
        gulp.src(src.json, {cwd: bases.locale} ).pipe(buildJSON());
    });

    // metatask that groups all builds
    gulp.task('build', [
            'buildJS',
            'buildHTML',
            'buildIMG',
            'buildCSS',
            'copyStaticAssets',
            'buildJSON'], function() {
    });

    /**
     * Watch tasks
     */
    gulp.task('watch', function () {
        console.log('Watching for changes on source files');
        watch('scripts/**/*.js', {cwd: bases.app}, function() {
            gulp.src(src.scripts, {cwd: bases.app})
                .pipe(buildJS());
        });
        watch(src.css, {cwd: bases.app}, function() {
            gulp.src(src.css, {cwd: bases.app})
                .pipe(buildCSS());
        });
        watch(src.html, {cwd: bases.app, base: process.cwd() + bases.app})
          .pipe(buildHTML());
        src.static_assets.forEach(function (item) {
            watch(bases.app + item).pipe(copyStaticAssets());
        });
        watch(bases.locale + src.json).pipe(buildJSON());
    });

    gulp.task('default', ['build', 'watch']);

}());
