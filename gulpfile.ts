/// <reference path="typings/tsd.d.ts" />

import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
//import * as rimraf from 'rimraf';
var rimraf = require('gulp-rimraf');
var serve = require('gulp-live-server');

gulp.task('build',['copy-static-files'],function (){
	var tsProject = ts.createProject('./src/tsconfig.json');
	var tsResult = tsProject.src().pipe(ts(tsProject));
	return tsResult.js.pipe(gulp.dest('build'));;
});

gulp.task('clean', function(){
  return gulp.src('build').pipe(rimraf());
});

gulp.task('copy-static-files',['copy-html','copy-css','copySystemLib','copyAngular2Lib']);

gulp.task('copy-html', ['clean'],function(){
  return gulp.src('./src/**/*.html').pipe(gulp.dest('build'))
});

gulp.task('copy-css', ['clean'], function(){
  return gulp.src('./src/css/*.css').pipe(gulp.dest('build/css'))
});

gulp.task('copySystemLib', ['clean'], function () {
  var clientResult = gulp.src('./node_modules/systemjs/dist/system.src.js')
  return clientResult.pipe(gulp.dest('./build/lib'));
});

gulp.task('copyAngular2Lib', ['clean'], function () {
  var clientResult = gulp.src('./node_modules/angular2/bundles/angular2.dev.js')
  return clientResult.pipe(gulp.dest('./build/lib'));
});

gulp.task('serve', ['build','watch-client'], function(){
  var server = serve.static("build");
  server.start();
  
  //gulp.watch(['build/**/*.js', 'build/**/*.html'], function (file) {
  //  server.notify.apply(server, [file]);
  //});
});

gulp.task('watch-client', function() {
  gulp.watch('./src/**/*.*', ['build']);
});


gulp.task('default',['serve']);