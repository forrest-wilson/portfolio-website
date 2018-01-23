var gulp = require("gulp"),
    clean = require("gulp-clean"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    runSequence = require("run-sequence");

///////////////////////////
//// Development Build ////
///////////////////////////

gulp.task("cleanTemp", function() {
    return gulp.src("./temp/", {read: false})
        .pipe(clean());
});

gulp.task("sass", function() {
    return gulp.src("./src/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest("./temp/css/"));
});

gulp.task("copy", function() {
    gulp.src("./src/js/*.js")
        .pipe(gulp.dest("./temp/js/"));
    
    gulp.src("./src/*.html")
        .pipe(gulp.dest("./temp/"));
});

gulp.task("build:temp", function(cb) {
    runSequence("cleanTemp", "sass", "copy", cb);
});

gulp.task("start", ["build:temp"], function(cb) {
    gulp.watch("./src/**/*.*", ["build:temp"], cb);
})

//////////////////////////
//// Production Build ////
//////////////////////////