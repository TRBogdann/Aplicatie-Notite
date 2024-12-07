
const express = require('express');
const router = express.Router();
const log = require('./util/log');
const DataBase = require('./util/database');
const { json } = require('body-parser');

const connectionInfo = 
{
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

const db = new DataBase(connectionInfo,'SingUp');

router.post('/',async(req,res)=>{
    try{
        res.status(200).send("I got it!!");
    }
    catch(err)
    {
        log.print('Sign Up','Bad data reached the server');
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;