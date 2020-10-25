const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = require('../config/keys').MONGO_URI;

// Database Name
const dbName = 'myproject';
let _db;
// Use connect method to connect to the server


/**
 *  returns a connected database object through which we can execute all our database operations.
 * @param {string} dbName 
 */
const getDb = (dbName) => {
    return _db;
}

/**
 * initializes our database and makes sure it is ready for use — basically connects to the database.
 */
const initDb = (callback) => {
    MongoClient.connect(url, function (err, client) {
        console.log("Connected successfully to mongoDB");

        _db = client.db(dbName);
        return callback(err);
        //client.close();
    });
}

exports.getDb = getDb;
exports.initDb = initDb;