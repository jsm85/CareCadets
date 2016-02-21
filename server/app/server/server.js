var Hapi = require('hapi');
var http = require('http');

var server = new Hapi.Server();

var charitiesRoutes = require('../charities/charities.routes.js');
var donationRoutes = require('../donations/donations.routes.js');
var glossaryRoutes = require('../glossary/glossary.routes.js');
var pagesRoutes = require('../pages/pages.routes.js');

server.connection({
  host: '0.0.0.0',
  port: 8000,
  routes: {
    cors: true
  }
});

charitiesRoutes.forEach(route => server.route(route));
donationRoutes.forEach(route => server.route(route));
glossaryRoutes.forEach(route => server.route(route));
pagesRoutes.forEach(route => server.route(route));

module.exports = server;