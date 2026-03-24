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

async function createUser(email, password){
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
    };

    DB.addUser(user);

    return user;
}

function getUser(field, value){
    if (value) {
        return users.find((user) => user[field] === value);
    }
    return null;
}

function setAuthCookie(res, user) {
    user.token = uuid.v4();

    res.cookie('token', user.token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}


//Verify Auth endpoints are right for auth
apiRouter.post('/auth/create', async (req, res) => {
    if (await getUser('email', req.body.userName)) {
        res.status(409).send({msg: 'Existing user'});
    } else {
        const user = await createUser(req.body.userName, req.body.password);

        setAuthCookie(res, user);

        res.send({email : user.email});
    }
});

apiRouter.post('/auth/login', async(req,res) => {
    const user = await getUser('email', req.body.userName);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        setAuthCookie(res, user);

        res.send({ email: user.email});
    } else {
        res.status(401).send({msg: 'Unauthorized'});
    }
})

apiRouter.delete('/auth/logout', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    if (user) {
        clearAuthCookie(res, user);
    }

    res.send({});
});

function clearAuthCookie(res, user) {
    delete user.token;
    res.clearCookie('token');
}

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


apiRouter.post('/savePref', verifyAuth, (_req, res) => {
    const user = getUser("token", _req.cookies[authCookieName]);
    preferences[user.email] = _req.body;
    res.send(_req.body);
});

apiRouter.get('/getPref', verifyAuth, (req,res) => {
    const user = getUser("token", req.cookies[authCookieName]);
    const data = preferences[user.email];
    res.send(data);
});







app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});