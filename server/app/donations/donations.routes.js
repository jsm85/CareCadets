var handlers = require('./donations.handlers.js');

module.exports = [
  { method: 'GET', path:'/donations/{donationId}', handler: handlers.getDonation },
  { method: 'GET', path:'/donations/by/{username}', handler: handlers.getDonations },
  { method: 'POST', path:'/donations', handler: handlers.postDonation },
  { method: 'POST', path:'/thanks/{donationId}', handler: handlers.postThanks },
];