
const express = require('express');
const router = express.Router();
const log = require('./util/log');
const DataBase = require('./util/database');
const Server_Error = require('./util/errors');
const RequestModel = require('./models/requestmodel');
const UserModel = require('./models/usermodel');

const connectionInfo = 
{
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};


const db = new DataBase(connectionInfo,'VerifyMail');

const request_model = new RequestModel(db);
const user_model = new UserModel(db);

router.get("/:token", async (req, res) => {
    
    try{
    const exists = await request_model.exists(req.params.token);

    if(exists)
    {   
        const request = await request_model.getRequest(req.params.token);
        await user_model.verify(request.userId);
        await request_model.deleteRequest(req.params.token);
        res.status(200).send("<h1>Account Verified</h1>");
    }
    else
        res.status(404).send("<h1>Invalid Or Expired Request</h1>");
    }
    catch(err)
    {
        res.status(404).send("<h1>Invalid Or Expired Request</h1>");
    }
});

module.exports = router;