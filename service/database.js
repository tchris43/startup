const { MongoClient } = require('mongodb');
const config = requie('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('NextEvent');
const userCollection = db.collection('users');
const preferenceCollection = db.collection('preferences');

async function main() {
    try {
        // here is the database code
    } finally {
        client.close();
    }
}

main();