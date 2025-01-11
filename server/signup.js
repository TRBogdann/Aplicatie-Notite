
const express = require('express');
const router = express.Router();
const log = require('./util/log');
const DataBase = require('./util/database');
const { json } = require('body-parser');
const User = require('./entities/user');
const UserModel = require('./models/usermodel');
const formchecker = require('./util/formchecker');
const Server_Error = require('./util/errors');
const RequestModel = require('./models/requestmodel');
const UserRequest = require('./entities/request');
const SendEmail = require('./util/mail');

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


router.post('/',async(req,res)=>{
    try
    {
        const valid = await formchecker.checkForm(req.body);

        if(valid==1)
            throw new Server_Error("Invalid Data Reached the Server",500);

        if(valid==2)
            throw new Server_Error("Not Acceptable",406);

        

        const hash = await User.getHash(req.body.password);
        const user = new User(req.body,hash);
        
        await model.createAccount(user,hash);

        const verifyRequest = new UserRequest(user.getId(),"mail_verif");
        await request_model.createRequest(verifyRequest);

        SendEmail(user.email,"Verification Code","Use this link to verify your email: http://localhost:2020/verifymail/"+verifyRequest.token,"Verification Email");
        
        res.status(200).send("Account created successfully");
    }
    catch(err)
    {
        if(err.status===undefined)
        {
            log.print('Sign Up',"Undefiend Error");
            log.print('Sign Up',err.message);
            res.status(500).send("Internal Server Error");
        }
        else
        {
            if(err.status>=500)
                log.print('Sign Up',err.message);

            res.status(err.status).send(err.message);
        }
    }
});

module.exports = router;