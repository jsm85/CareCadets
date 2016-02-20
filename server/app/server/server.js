var Hapi = require('hapi');
var http = require('http');

var server = new Hapi.Server();
var MongoClient = require('mongodb').MongoClient;

var donationTypes = require('../pages/donationTypes.js');
var places = require('../pages/places.js');
var glossary = require('../pages/glossary.js');

server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path:'/glossary',
  handler: (request, reply) => {
    reply(glossary);
  }
});

server.route({
  method: 'GET',
  path:'/charities',
  handler: (request, reply) => {

    var orgHunterKey = process.env.ORGHUNTER_KEY;

    var orgHunterReq = {
      method: 'GET',
      host: 'data.orghunter.com',
      path: '/v1/charitysearch?user_key=' + orgHunterKey + '&rows=1000&eligible=1'
    };

    callback = (response) => {
      var result = '';

      response.on('data', (chunk) => result += chunk);
      response.on('end', () => {
        var payload = JSON.parse(result);

        var allCharities = payload.data;
        var charitiesAcceptingDonations = [];

        allCharities.forEach(charity => {
          if (charity.acceptingDonations === 1) {
            charitiesAcceptingDonations.push(charity);
          }
        });

        reply(charitiesAcceptingDonations);
      });
    };

    http.request(orgHunterReq, callback).end();
  }
});

server.route({
  method: 'GET',
  path:'/pages/{avatarname}/{donationType}/{place}',
  handler: (request, reply) => {
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