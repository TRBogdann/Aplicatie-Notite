const express = require('express');
const router = express.Router();
const log = require('./util/log');
const formchecker = require('./util/formchecker');
const DataBase = require('./util/database');
const User = require('./entities/user');
const UserModel = require('./models/usermodel');
const Server_Error = require('./util/errors');
const Session = require('./entities/session');
const SessionModel = require('./models/sessionmodel');


const connectionInfo = 
{
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};


const db = new DataBase(connectionInfo,'Login');
const user_model = new UserModel(db);
const session_model = new SessionModel(db);

router.post('/',async (req,res)=>
{
    try
    {   
        const valid = formchecker.checkLogin(req.body);

        if(valid==1)
            throw new Server_Error("Invalid Data Reached the Server",500);

        if(valid==2)
            throw new Server_Error("Not Acceptable",406);
        
        const user = await user_model.getUser(req.body.username,req.body.password);
        
        if(user===undefined)
            throw new Server_Error("Username or Email not found",404);
        
        if(user===null)
            throw new Server_Error("Incorrect Password",401);

        if(user==="")
            throw new Server_Error("Unverified User",401);
        
        const userIp= req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const newSession = new Session(user.getId(),userIp);
        
        await session_model.createSession(newSession);

        res.status(200).send({session_id:newSession.getSessionId()});
    }
    catch(err)
    {
        if(err.status!=undefined)
        {
            if(err.status>=500) 
                log.print("Login",err.message);

            res.status(err.status).send(err.message);
        }
        else
        {
            log.print("Login","Undefiend Error");
            log.print("Login",err.message);
            res.status(500).send("Internal Sever Problem");
        }
    }
});

module.exports = router;