
const express = require('express');
const router = express.Router();
const log = require('./util/log');
const DataBase = require('./util/database');
const Server_Error = require('./util/errors');
const SendEmail = require('./util/mail');
const Session = require('./entities/session');
const SessionModel = require('./models/sessionmodel');
const app = express();
const connectionInfo = 
{
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

const db = new DataBase(connectionInfo,'SingUp');

const model = new UserModel(db);
const request_model = new RequestModel(db);

module.exports = router;