var gulp = require('gulp'),
  spawn = require('child_process').spawn,
  node;

gulp.task('server', function() {
  killNode();
  node = spawn('node', ['app/index.js'], { stdio: 'inherit' });
});

process.on('exit', function() {
  killNode();
});

function killNode() {
  if (node) {
    node.kill();
  }
}