var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;

var mongoDbConnectionString = 'mongodb://localhost:27017/care_cadets';

function getDonation(request, reply) {
  MongoClient.connect(mongoDbConnectionString, (err, db) => {
    if(err) {
      throw err;
    }

    var cursor = db.collection('donations').find({'_id': new Mongo.ObjectID(request.params.donationId)});

    cursor.toArray((err, donations) => {
        db.close();
        reply(donations[0]);
    });
  });
}

function getDonations(request, reply) {
  MongoClient.connect(mongoDbConnectionString, (err, db) => {
    if(err) {
      throw err;
    }

    var cursor = db.collection('donations').find({username: request.params.username});

    cursor.toArray((err, donations) => {
        db.close();
        reply(donations);
    });
  });
}

function postDonation(request, reply) {
  MongoClient.connect(mongoDbConnectionString, (err, db) => {
    if(err) {
      throw err;
    }

    db.collection('donations').insert(request.payload, (err, docs) => {
      db.close();
      reply(docs);
    });
  });
}

function getThanks(request, reply) {
  MongoClient.connect(mongoDbConnectionString, (err, db) => {
    if(err) {
      throw err;
    }

    var cursor = db.collection('donations').find({username: request.params.username, thanked: true});

    cursor.toArray((err, donations) => {
        db.close();
        reply(donations);
    });
  });
}

function postThanks(request, reply) {
  MongoClient.connect(mongoDbConnectionString, (err, db) => {
    if(err) {
      throw err;
    }

    var query = {
      '_id': new Mongo.ObjectID(request.params.donationId)
    };

    var setObj = {
      $set: { 
        'thanked': true,
        'thankYouMessage': request.payload
      }
    };

    db.collection('donations').updateOne(query, setObj, (err) => {
      reply();
   });
  });
}

module.exports = {
  getDonation: getDonation,
  getDonations: getDonations,
  postDonation: postDonation, 
  getThanks: getThanks, 
  postThanks: postThanks,
};