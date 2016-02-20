var server = require('./server/server.js');

if (!module.parent) {
  server.start();
  console.log('Application started at localhost:8000.\n');
}