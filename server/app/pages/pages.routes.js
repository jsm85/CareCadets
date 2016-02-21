var handlers = require('./pages.handlers.js');

module.exports = [
  { method: 'GET', path:'/pages/{username}/{donationType}/{place}', handler: handlers.getPage },
];