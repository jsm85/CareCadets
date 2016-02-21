var donationTypes = require('./donationTypes.js');
var places = require('./places.js');

var routes = [
  { method: 'GET', path:'/pages/{username}/{donationType}/{place}', handler: getPage }
];

function getPage(request, reply) {
  var name = request.params.username;
  var donationType = donationTypes[request.params.donationType];
  var place = places[request.params.place];

  var result = place;

  result = result.replace(/\{name\}/g, name);
  result = result.replace(/\{donation\}/g, donationType.name);
  result = result.replace(/\{donation-verb\}/g, donationType.verb);
  result = result.replace(/\{donation-effect\}/g, donationType.effect);

  reply(result);
}

module.exports = routes;