//to establish connection to the database
//the module returns a function which return the database connection instance "db" to query the database.

var mongodb=require('mongodb');
var MongoClient=mongodb.MongoClient;
var url=process.env.MONGOLAB_URI||'mongodb://localhost:27017/indie_artist_db';

function getDb(){
    return MongoClient.connect(url).then(function (db) {
        return db;
    })
}

module.exports = getDb();

