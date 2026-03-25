const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');

const authCookieName = "token";

let users = [];

let apiRouter = express.Router();

const port = process.argv.length > 2 ?
process.argv[2] : 4000;

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(`/api`, apiRouter);
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(userName, password){
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        userName: userName,
        password: passwordHash,
        token: uuid.v4(),
    };

    await DB.addUser(user);

    return user;
}

function getUser(field, value){
    if (!value) return null;

    if (field === 'token'){
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}

function setAuthCookie(res, user) {
    res.cookie('token', user.token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}


//Verify Auth endpoints are right for auth
apiRouter.post('/auth/create', async (req, res) => {
    if (await getUser('userName', req.body.userName)) {
        res.status(409).send({msg: 'Existing user'});
    } else {
        const user = await createUser(req.body.userName, req.body.password);

        setAuthCookie(res, user);

        res.send({userName : user.userName});
    }
});

apiRouter.post('/auth/login', async(req,res) => {
    const user = await getUser('userName', req.body.userName);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        console.log('generating token');
        var token = uuid.v4();
        console.log('token is: ', token);
        user.token = token;
        await DB.updateUser(user);
        setAuthCookie(res, user);

        res.send({ userName: user.userName});
    } else {
        res.status(401).send({msg: 'Unauthorized'});
    }
})

apiRouter.delete('/auth/logout', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    if (user) {
        await DB.updateUserRemoveAuth(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

function verifyAuth(req, res, next){
    const user = getUser("token", req.cookies[authCookieName]);
    if (user){
        next();
    }
    else {
        res.status(401).send({msg: "Error: Unauthorized"});
    }
};


let preferences = {};


apiRouter.post('/savePref', verifyAuth, async (_req, res) => {
    const user = await getUser("token", _req.cookies['token']);
    // preferences[user.userName] = _req.body;
    const preferences = DB.getPreferences(user.userName);
    if (preferences){
        DB.updatePreferences(user.userName, _req.body);
    }
    else{
        DB.addPreferences(user.userName, _req.body);
    }
    res.send(_req.body);
});

apiRouter.get('/getPref', verifyAuth, async (req,res) => {
    const user = await getUser("token", req.cookies['token']);
    console.log();
    const data = await DB.getPreferences(user.userName);
    res.send(data);
});







app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});