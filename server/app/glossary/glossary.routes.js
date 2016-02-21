var handlers = require('./glossary.handlers.js');

module.exports = [
  { method: 'GET', path:'/glossary', handler: handlers.getGlossary },
];