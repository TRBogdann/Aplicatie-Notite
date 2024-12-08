
const express = require('express');
const router = express.Router();
const log = require('./util/log');
const DataBase = require('./util/database');
const { json } = require('body-parser');
const User = require('./entities/user');
const UserModel = require('./models/usermodel');


const connectionInfo = 
{
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};


const db = new DataBase(connectionInfo,'SingUp');
const model = new UserModel(db);


router.post('/',async(req,res)=>{
    try
    {
        const hash = await User.getHash(req.body.password);
        const user = new User(req.body,hash);
        await model.createAccount(user,hash);
        res.status(200).send("Account created successfully");
    }
    catch(err)
    {
        log.print('Sign Up',err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;