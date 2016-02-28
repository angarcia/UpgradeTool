var gulp = require('gulp'),
    del = require('del'),
    runSeq = require('run-sequence');
    shell = require('gulp-shell');

gulp.task('clean', function(){
    return del('dist/frontend/**/*', {force:true});
});

gulp.task('copy:vendor', function(){
    return gulp.src([
            "node_modules/es6-shim/es6-shim.min.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/angular2/bundles/angular2-polyfills.js",
            "node_modules/systemjs/dist/system.src.js",
            "node_modules/rxjs/bundles/Rx.js",
            "node_modules/angular2/bundles/angular2.dev.js",
            "node_modules/jQuery/dist/jquery.min.js",
            "node_modules/bootstrap/dist/js/bootstrap.min.js"
        ])
        .pipe(gulp.dest('./dist/frontend/scripts/vendor'))
})

gulp.task('copy:css', function(){
    return gulp.src([
            "node_modules/bootstrap/dist/css/bootstrap.min.css",
            './src/frontend/css/*.css'
        ])
        .pipe(gulp.dest('./dist/frontend/css'))
})

gulp.task('copy:index', function(){
    return gulp.src('./src/frontend/index.html')
        .pipe(gulp.dest('./dist/frontend'));
});

gulp.task('copy:html', function(){
    return gulp.src('./src/frontend/app/components/*.html')
        .pipe(gulp.dest('./dist/frontend/app/components'));
});

gulp.task('frontend', function(done){
    return runSeq('clean', ['copy:vendor', 'copy:css', 'copy:index', 'copy:html'], done);
})

gulp.task('clean-electron', function(){
    return del('dist/electron-package/**/*', {force: true});
});

gulp.task('copy:electron-manifest', function(){
   return gulp.src('./src/assets/package.json')
       .pipe(gulp.dest('./dist/electron-package'))
});

gulp.task('copy:electron-scripts', function(){
    return gulp.src('./src/main/index.js')
        .pipe(gulp.dest('./dist/electron-package'));
});

gulp.task('copy:spa-for-electron', function(){
    return gulp.src("./dist/frontend/**/*")
        .pipe(gulp.dest('dist/electron-package'));
});

gulp.task('electron', function(done){
    return runSeq('clean-electron', ['copy:electron-manifest', 'copy:electron-scripts', 'copy:spa-for-electron'], done);
});

gulp.task ('start', shell.task([
  './node_modules/.bin/electron dist/electron-package'
]));
