var handlers = require('./charities.handlers.js');

module.exports = [
  { method: 'GET', path:'/charities/{filter}', handler: handlers.getCharities },
];