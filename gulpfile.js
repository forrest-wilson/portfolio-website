var gulp = require("gulp"),
    clean = require("gulp-clean"),
    sass = require("gulp-sass"),
    inject = require("gulp-inject"),
    jshint = require("gulp-jshint"),
    autoprefixer = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create(),
    runSequence = require("run-sequence"),
    merge = require("merge-stream");

var paths = {
    src: "./src",
    tmp: "./tmp",
    dist: "./dist",
    module: "./node_modules"
}

///////////////////////////
//// Development Build ////
///////////////////////////

gulp.task("cleanTmp", function() {
    return gulp.src(paths.tmp, {read: false})
        .pipe(clean());
});

gulp.task("inject", function() {
    return gulp.src(paths.src + "/index.html")
        .pipe(inject(gulp.src(paths.module + "/jquery/dist/jquery.min.js", { read: false }), { name: "jq" }))
        .pipe(inject(gulp.src(paths.tmp + "/js/loader.js", { read: false }), { name: "loader" }))
        .pipe(inject(gulp.src([
            paths.module + "/normalize.css/normalize.css",
            paths.module + "/font-awesome/css/font-awesome.min.css",
            paths.tmp + "/css/*.css",
            paths.tmp + "/js/app.js"
        ], { read: false })))
        .pipe(gulp.dest(paths.tmp));
});

gulp.task("sass", function() {
    return gulp.src(paths.src + "/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest(paths.tmp + "/css/"));
});

gulp.task("lint", function() {
    return gulp.src(paths.src + "/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(gulp.dest(paths.tmp + "/js/"));
});

gulp.task("copy", function() {
    var assets = gulp.src(paths.src + "/assets/**/*.*")
        .pipe(gulp.dest(paths.tmp + "/assets/"));

    var favicon = gulp.src(paths.src + "/favicon.png")
    .pipe(gulp.dest(paths.tmp));

    return merge(assets, favicon);
});

gulp.task("serve", function() {
    return browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000,
        ui: {
            port: 3001
        },
        notify: false,
        browser: []
    });
});

gulp.task("reload-browser", function() {
    return gulp.src("./")
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task("build:tmp", function(cb) {
    runSequence("cleanTmp", "sass", "lint", "copy", "inject", "reload-browser", cb);
});

gulp.task("start", ["build:tmp", "serve"], function(cb) {
    gulp.watch(paths.src + "/**/*.*", ["build:tmp"], cb);
});