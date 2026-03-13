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


app.get(/.*/, (_req, res) => {
    res.send({msg: "service message"});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});