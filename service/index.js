const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const authCookieName = "token";

let users = [];
let preferences = [];

let apiRouter = express.Router();

const port = process.argv.length > 2 ?
process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(`/api`, apiRouter);

async function createUser(email, password){
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
    };

    users.push(user);

    return user;
}

function getUser(field, value){
    if (value) {
        return users.find((user) => user[field] === value);
    }
    return null;
}

apiRouter.post('/auth', async (req, res) => {
    res.send(req.body);
});

apiRouter.put('/auth', async(req,res) => {
    res.send({ email: 'taylor@gmail.com' });
})

apiRouter.delete('/auth', async (req, res) => {
    res.send({});
})

apiRouter.get('/user', async(req,res) => {
    res.send({ email: 'taylor@gmail.com' });
})



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});