var MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'Fake';


dbconnection = {
    getToken: function (email) {
        return MongoClient.connect(url, { useNewUrlParser: true }).then(function (client) {
            var db = client.db(dbName);
            return db.collection('Users').find({ "Email": email }).project({}).toArray().then(function (result) {
                client.close();
                return result;
            }).catch(function (error) {
                return error;
            })
        }).catch(function (error) {
            return error;
        });
    },

    insert: function (newDoc) {
        return MongoClient.connect(url, { useNewUrlParser: true }).then(function (client) {
            var db = client.db(dbName);
            db.collection('Users').insert(newDoc)
        })
    },

    update: function (id, product) {
        key = Object.keys(product);
        value = Object.values( );
        return MongoClient.connect(url, { useNewUrlParser: true }).then(function (client) {
            var db = client.db(dbName);
            db.collection('Users').updateOne(
                { _id: id },
                {
                    $set: {
                        [key] : value
                    }
                },
                {
                    upsert: true
                }).toArray().then(function (result) {
                    console.log(result)
                    console.log(key, value)
                    client.close();
                    return result;

                }).catch(function (error) {
                    return error;
                })
        }).catch(function (error) {
            return error;
        });
    }
}

module.exports = dbconnection;