var Hapi = require('hapi');

var server = new Hapi.Server();
var MongoClient = require('mongodb').MongoClient;

var donationTypes = require('../pages/donationTypes.js');
var places = require('../pages/places.js');

server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path:'/healthcheck',
  handler: function(request, reply) {
    reply('CareCadents backend is alive!');
  }
});

server.route({
  method: 'GET',
  path:'/pages/{avatarname}/{donationType}/{place}',
  handler: function(request, reply) {
    var name = request.params.avatarname;
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