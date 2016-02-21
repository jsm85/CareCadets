var Hapi = require('hapi');
var http = require('http');

var server = new Hapi.Server();

var donationTypes = require('../pages/donationTypes.js');
var places = require('../pages/places.js');

var charitiesRoutes = require('../charities/charities.js');
var donationRoutes = require('../donations/donations.js');
var glossaryRoutes = require('../pages/glossary.js');

server.connection({
  host: '0.0.0.0',
  port: 8000
});

charitiesRoutes.forEach(route => server.route(route));
donationRoutes.forEach(route => server.route(route));
glossaryRoutes.forEach(route => server.route(route));

server.route({
  method: 'GET',
  path:'/pages/{username}/{donationType}/{place}',
  handler: (request, reply) => {
    var name = request.params.username;
    var dontationType = donationTypes[request.params.donationType];
    var place = places[request.params.place];

    var text = buildDonationInfoText(name, dontationType, place);

    reply(text);
  }
});

function buildDonationInfoText(name, donationType, place) {
  var result = place;

  result = result.replace(/\{name\}/g, name);
  result = result.replace(/\{donation\}/g, donationType.name);
  result = result.replace(/\{donation-verb\}/g, donationType.verb);
  result = result.replace(/\{donation-effect\}/g, donationType.effect);

  return result;
}

module.exports = server;