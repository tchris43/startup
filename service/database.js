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

function getUserByToken(token){
    return userCollection.findOne({token: token});
}

function getUser(userName){
    return userCollection.findOne({userName: userName});
}

async function updateUser(user){
    await userCollection.updateOne({userName: user.userName}, {$set: user});
}

async function updateUserRemoveAuth(user){
    await userCollection.updateOne({userName: user.userName}, {$unset: {token: 1}});
}

async function addPreferences(userName, preferences){
    await preferenceCollection.insertOne({userName: userName, preferences: preferences});
}

function getPreferences(userName){
    return preferenceCollection.findOne({userName:userName});
}

async function updatePreferences(userName, preferences){
    await preferenceCollection.updateOne({userName:userName}, {$set: {preferences:preferences}});
}

module.exports = {
    addUser,
    getUserByToken,
    getUser,
    updateUserRemoveAuth,
    addPreferences,
    updateUser,
    getPreferences,
    updatePreferences,
};