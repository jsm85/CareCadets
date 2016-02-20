var Hapi = require('hapi');

var server = new Hapi.Server();
var MongoClient = require('mongodb').MongoClient;

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

module.exports = server;