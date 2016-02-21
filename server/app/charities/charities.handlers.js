var http = require('http');

function getCharities(request, reply) {
  var orgHunterReq = {
    method: 'GET',
    host: 'data.orghunter.com',
    path: '/v1/charitysearch?user_key=7b302cfd41ae4d5417695cb4030edfa6&rows=1000&eligible=1&searchTerm=' + request.params.filter
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

module.exports = {
  getCharities: getCharities
}