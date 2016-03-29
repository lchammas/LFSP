gulp = require 'gulp'
#gulpUtil = require 'gulp-util'
jade = require 'gulp-jade'
sass = require 'gulp-sass'
webpack = require 'gulp-webpack'
jadeInheritance = require 'gulp-jade-inheritance'


gulp.task 'scripts', ->
  js = webpack
    module:
      loaders: [
        test: /\.coffee$/
        loader: 'coffee'
      ]
    output:
       filename: 'script.js'
  gulp.src 'scripts/boot.js'
    .pipe(js)
    .pipe gulp.dest 'deploy/js/'

gulp.task 'src', ->
  gulp.src 'src/*.jade'
    .pipe(jade())
    .pipe gulp.dest 'deploy/'

gulp.task 'jade-inheritance', ->
  gulp.src('src/layout.jade')
    .pipe(jadeInheritance({basedir: 'src/'}))
    .pipe(jade())
    .pipe gulp.dest 'deploy/'

gulp.task 'sass', ->
  gulp.src 'styles/style.scss'
    .pipe(sass())
    .pipe gulp.dest 'deploy/CSS/'

gulp.task 'default', ['scripts' ,'src', 'jade-inheritance', 'sass'], ->
  gulp.watch 'scripts/*.coffee', ['scripts']
  gulp.watch 'src/*.jade', ['src']
  gulp.watch 'src/*.jade', ['jade-inheritance']
  gulp.watch 'materialize/sass/**/*.scss', ['sass']
  gulp.watch 'styles/*.scss', ['sass']
