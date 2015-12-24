var gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    //uglify = require('gulp-uglify'),
    //ngAnnotate = require('gulp-ng-annotate');
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    Server = require('karma').Server,
    connect = require('gulp-connect');

var paths = {
    temp: './www/temp/',
    scripts: './www/scripts/',
    sass: './www/scss/**/*.scss',
    es6: './www/es6/**/*.es6'
};

gulp.task('clean-temp', function(){
    return del([paths.temp]);
});

gulp.task('babel', ['clean-temp'], function () {
    return gulp.src(paths.es6)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
            //modules: "common"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.temp));
});

gulp.task('clean-scripts', function(){
    return del([paths.scripts]);
});

gulp.task('commonjs',['babel', 'clean-scripts'], function(){
    return browserify(paths.temp+'app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        //.pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        //.pipe(uglify()) // now gulp-uglify works
        // Start piping stream to tasks!
        .pipe(gulp.dest(paths.scripts));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.es6, ['eslint', 'commonjs']);
});

gulp.task('sass', function(done) {
    gulp.src('./www/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/styles/'))
        //.pipe(minifyCss({
        //    keepSpecialComments: 0
        //}))
        .pipe(gulp.dest('./www/styles/'))
        .on('end', done);
});

gulp.task('eslint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(paths.es6)
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
            'extends' : '.eslintrc',
            'globals': {
                'angular': true
            }
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format());
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    //.pipe(eslint.failAfterError());
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


gulp.task('connect', function() {
    connect.server({
        root: './www',
        port: 8100,
        livereload: true
    });
});

// Start the tasks
gulp.task('default', ['connect', 'watch']);
