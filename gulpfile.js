var gulp = require("gulp"),
    clean = require("gulp-clean"),
    sass = require("gulp-sass"),
    inject = require("gulp-inject"),
    jshint = require("gulp-jshint"),
    uglify = require("gulp-uglify"),
    autoprefixer = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    replace = require("gulp-replace"),
    htmlmin = require("gulp-htmlmin"),
    browserSync = require("browser-sync").create(),
    runSequence = require("run-sequence"),
    merge = require("merge-stream"),
    rename = require("gulp-rename");

var paths = {
    src: "./src",
    tmp: "./tmp",
    dist: "./dist",
    module: "./node_modules"
}

//***************************//
//**** Development Build ****//
//***************************//

gulp.task("cleanTmp", function() {
    return gulp.src(paths.tmp, {read: false})
        .pipe(clean());
});

gulp.task("inject", function() {
    return gulp.src(paths.src + "/index.html")
        .pipe(inject(gulp.src([
            paths.tmp + "/js/injector.js",
            paths.module + "/jquery/dist/jquery.min.js",
            paths.tmp + "/js/loader.js"
        ], { read: false }),
        { name: "preload" }))
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
            browsers: ["last 2 versions"],
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

    var modules = gulp.src(paths.src + "/modules/**/*.*")
        .pipe(gulp.dest(paths.tmp + "/modules/"));

    return merge(assets, favicon, modules);
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

//**************************//
//**** Production Build ****//
//**************************//

gulp.task("clean:dist", function() {
    return gulp.src(paths.dist, {read: false})
        .pipe(clean());
});

gulp.task("css", function() {
    return gulp.src(paths.src + "/sass/**/*.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest(paths.dist + "/css/"));
});

gulp.task("js", function() {
    return gulp.src(paths.src + "/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(paths.dist + "/js/"));
});

gulp.task("html", function() {
    return gulp.src(paths.src + "/index.html")
        .pipe(inject(gulp.src([
            paths.dist + "/js/injector.min.js",
            paths.module + "/jquery/dist/jquery.min.js",
            paths.dist + "/js/loader.min.js"
        ], { read: false }),
        {
            name: "preload",
            ignorePath: ["/dist"]
        }))
        .pipe(inject(gulp.src([
            paths.module + "/normalize.css/normalize.css",
            paths.module + "/font-awesome/css/font-awesome.min.css",
            paths.dist + "/css/style.min.css",
            paths.dist + "/js/app.min.js",
        ], { read: false }), { ignorePath: ["/dist"] }))
        .pipe(replace("/node_modules/jquery/dist/jquery.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"))
        .pipe(replace("/node_modules/font-awesome/css/font-awesome.min.css", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"))
        .pipe(replace("/node_modules/normalize.css/normalize.css", "https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task("copy:dist", function() {
    var assets = gulp.src(paths.src + "/assets/**/*.*")
        .pipe(gulp.dest(paths.dist + "/assets/"));

    var favicon = gulp.src(paths.src + "/favicon.png")
        .pipe(gulp.dest(paths.dist));

    var modules = gulp.src(paths.src + "/modules/**.*")
        .pipe(gulp.dest(paths.dist + "/modules/"));

    return merge(assets, favicon, modules);
});

gulp.task("serve:dist", function() {
    return browserSync.init({
        server: {
            baseDir: paths.dist
        },
        port: 3000,
        ui: {
            port: 3001
        },
        notify: false,
        browser: []
    });
});

gulp.task("reload:dist", function() {
    return gulp.src(paths.dist)
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task("build:dist", function(cb) {
    runSequence("clean:dist", "css", "js", "html", "copy:dist", "reload:dist", cb);
});

gulp.task("build", ["build:dist", "serve:dist"], function(cb) {
    gulp.watch(paths.src + "/**/*.*", ["build:dist"], cb);
});