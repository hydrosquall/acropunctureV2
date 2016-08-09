// Build Tooling for Acropuncture- todo, port to Coffeescript
// 8.8.16
// Cameron Yick

var gulp = require('gulp');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

//////////////
// Run Once //
//////////////

// Downloads a JSON representation of a specified google spreadsheet
gulp.task('update-data', function () {
    return $
     .googleSpreadsheets(config.googleSheets['acropuncture']) // Some gsheet ID
     .pipe(gulp.dest(config.data));
    }
);

gulp.task('build-templates', function() {
    return gulp
     .src(config.pug)
     .pipe($.plumber())
     .pipe($.data( function(file) {
        return require(config.tableData);
     }))
     .pipe($.pug())
     .pipe(gulp.dest(config.build));
});

gulp.task('copy-js', function() {
    return gulp
     .src(config.js)
     .pipe($.concat('app.js'))
     .pipe($.uglify())
     .pipe(gulp.dest(config.build + "js/"));
});

gulp.task('deploy', ['build-templates'], function() {
    return gulp
      .src(config.build + '**/*.*')
      .pipe($.ghPages());
});
