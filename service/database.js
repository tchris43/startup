const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('NextEvent');
const userCollection = db.collection('users');
const preferenceCollection = db.collection('preferences');

(async function testConnection() {
    try {   
        await db.command({ping:1});
        console.log(`DB connected to ${config.hostname}`);
    } catch (ex) {
        console.log(`Error with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

async function addUser(user){
    await userCollection.insertOne(user);
}

function getUserByToken(value){
    return userCollection.findOne({token: value});
}

function getUser(value){
    return userCollection.findOne({email: value});
}

async function updateUserRemoveAuth(user){
    await userCollection.updateOne({email: user.email}, {$unset: {token: 1}});
}

module.exports = {
    addUser,
    getUserByToken,
    getUser,
    updateUserRemoveAuth,
};