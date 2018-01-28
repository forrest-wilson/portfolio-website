var gulp = require("gulp"),
    clean = require("gulp-clean"),
    sass = require("gulp-sass"),
    inject = require("gulp-inject"),
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
    var target = gulp.src(paths.src + "/index.html"),
        sources = gulp.src([
            paths.module + "/normalize.css/normalize.css",
            paths.module + "/font-awesome/css/font-awesome.min.css",
            paths.tmp + "/css/*.css",
            paths.module + "/jquery/dist/jquery.min.js",
            paths.tmp + "/js/loader.js",
            paths.tmp + "/js/app.js"
        ],
        { read: false }
    );
    
    return target.pipe(inject(sources))
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

gulp.task("copy", function() {
    var js = gulp.src(paths.src + "/js/*.js")
        .pipe(gulp.dest(paths.tmp + "/js/"));
    
    var html = gulp.src(paths.src + "/*.html")
        .pipe(gulp.dest(paths.tmp));

    var assets = gulp.src(paths.src + "/assets/**/*.*")
        .pipe(gulp.dest(paths.tmp + "/assets/"));

    return merge(js, html, assets);
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
    runSequence("cleanTmp", "sass", "copy", "inject", "reload-browser", cb);
});

gulp.task("start", ["build:tmp", "serve"], function(cb) {
    gulp.watch(paths.src + "/**/*.*", ["build:tmp"], cb);
});