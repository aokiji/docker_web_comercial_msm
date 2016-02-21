(function () {
    'use strict';

    var gulp    = require('gulp');
    var uglify  = require('gulp-uglify');

    // minify javascripts
    gulp.task('scripts', function (){
        console.log('Minifying your JS...');

        gulp.src('app/scripts/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('app/scripts/min'));
    });

    // watch task to check files for changes
    gulp.task('watch', function () {
        gulp.watch('app/scripts/*.js', ['scripts']);
    });

    gulp.task('default', ['scripts', 'watch']);

}());
