var gulp = require('gulp');
var shell = require('shelljs');

gulp.task('default', function() {
  console.log(shell.exec('git --version').stdout)
});
