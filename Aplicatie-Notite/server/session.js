
const express = require('express');
const router = express.Router();
const log = require('./util/log');
const DataBase = require('./util/database');
const Server_Error = require('./util/errors');
const SendEmail = require('./util/mail');
const SessionModel = require('./models/sessionmodel');
const UserModel = require('./models/usermodel');
const GroupModel = require('./models/groupmodel');
const Group = require('./entities/group');
const Note = require('./entities/note');
const Atachment = require('./entities/atachment');
const NoteModel = require('./models/notemodel');
const AtachmentModel = require('./models/attachmentmodel');

const connectionInfo = 
{
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};


const db = new DataBase(connectionInfo,'Sessions');
const model = new SessionModel(db);
const usermodel = new UserModel(db);
const groupsmodel = new GroupModel(db);
const notemodel = new NoteModel(db);
const fileModel = new AtachmentModel(db);



router.post("/",async (req,res)=>
{
    try {
    if(typeof req.body.id!=="string")
    {
        res.status(404).send(false);
    }

    const userIp= req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    let result = await model.validSession(req.body.id,userIp);
    res.status(200).send(result);
}
catch(e)
{
    log.print("ERROR",e.message);
}

});

router.post("/groups",async (req,res)=>
{
    try
    {
        if(typeof req.body.id !=='string')
            throw new Server_Error("Invalid Data Reached The Server",403);
        
        const userIp= req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        let result = await model.validSession(req.body.id,userIp);
        
        if(!result)
        {
            throw new Server_Error("Invalid Data Reached The Server",403);
        }

        let user = await usermodel.sessionGetUser(req.body.id,userIp);

        if(user == null)
        {
            throw new Server_Error("Session exists, User not found",500);
        }

        let groups = await groupsmodel.getGroups(user.getId());
        let jsonRes = {groups:[]}
        for(let gr of groups)
        {
            jsonRes.groups.push(
                {
                    group_id:gr.getGroupId(),
                    group_name:gr.group_name,
                    admin_id: gr.getAdminId(),
                    creation_date: gr.getCrationDate(),
                    group_image:gr.group_image,
                    group_description:gr.group_description
                }
            )
        }

        res.status(200).send(JSON.stringify(jsonRes));

    }
    catch(err)
    {
        if(err.status!=undefined)
        {
            if(err.status>=500) 
                log.print("Session",err.message);

            res.status(err.status).send(err.message);
        }
        else
        {
            log.print("Session","Undefiend Error");
            log.print("Session",err.message);
            res.status(500).send("Internal Sever Problem");
        }
    }
});

router.post("/friends",async (req,res)=>
    {
        try
        {
            if(typeof req.body.id !=='string')
                throw new Server_Error("Invalid Data Reached The Server",403);
            
            const userIp= req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            let result = await model.validSession(req.body.id,userIp);
            
            if(!result)
            {
                throw new Server_Error("Invalid Data Reached The Server",403);
            }
    
            let user = await usermodel.sessionGetUser(req.body.id,userIp);
    
            if(user == null)
            {
                throw new Server_Error("Session exists, User not found",500);
            }
    
            
            const arr  = await usermodel.getFriends(user.getId());
            
            let jsonRes = {friends:[]}
            for(const it of arr)
            {
                jsonRes.friends.push(
                    {
                        user_id:it.getId(),
                        email:it.email,
                        username:it.username,
                        firstName:it.firstName,
                        lastName:it.lastName,
                        profile_image:it.profile_image
                    }
                );
            }
            res.status(200).send(JSON.stringify(jsonRes));
    
        }
        catch(err)
        {
            if(err.status!=undefined)
            {
                if(err.status>=500) 
                    log.print("Session",err.message);
    
                res.status(err.status).send(err.message);
            }
            else
            {
                log.print("Session","Undefiend Error");
                log.print("Session",err.message);
                res.status(500).send("Internal Sever Problem");
            }
        }
    });


    router.post("/addnote",async (req,res)=>
        {
            try
            {
                if(typeof req.body.id !=='string')
                    throw new Server_Error("Invalid Data Reached The Server",403);

                const userIp= req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                let result = await model.validSession(req.body.id,userIp);
                
                if(!result)
                {
                    throw new Server_Error("Invalid Data Reached The Server",403);
                }
        
                let user = await usermodel.sessionGetUser(req.body.id,userIp);
        
                if(user == null)
                {
                    throw new Server_Error("Session exists, User not found",500);
                }
                
                
                const note = new Note(JSON.parse(req.body.note),user.getId());
                const files = []
                for(const it of JSON.parse(req.body.files))
                {
                    const file = new Atachment(it,note.getNoteId());
                    files.push(file);
                }

                await notemodel.createNote(note);
                for(const it of files)
                {
                    await fileModel.createAttachment(it);
                }
                
            }
            catch(err)
            {
                if(err.status!=undefined)
                {
                    if(err.status>=500) 
                        log.print("Session",err.message);
        
                    res.status(err.status).send(err.message);
                }
                else
                {
                    log.print("Session","Undefiend Error");
                    log.print("Session",err.message);
                    res.status(500).send("Internal Sever Problem");
                }
            }
        });
    
        router.post("/searchnotes",async (req,res)=>
            {
                try
                {
                    if(typeof req.body.id !=='string')
                        throw new Server_Error("Invalid Data Reached The Server",403);
    
                    const userIp= req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                    let result = await model.validSession(req.body.id,userIp);
                    
                    if(!result)
                    {
                        throw new Server_Error("Invalid Data Reached The Server",403);
                    }
            
                    let user = await usermodel.sessionGetUser(req.body.id,userIp);
                    
                    let notes;
                    
                    if(typeof req.body.search == "string" && req.body.search!=="")
                    {
                        notes = await notemodel.getNotes(req.body.search,'group');
                    }
                    else
                    {
                        notes = await notemodel.getNotes(user.getId(),'user');
                    }
                    
                    let jsonRes = {notes:[]}

                    for(const it of notes)
                    {
                        jsonRes.notes.push({
                                note_id:it.getNoteId(),
                                user_id:it.getUserId(),
                                md_data:it.md_data,
                                creation_date:it.getCreationDate,
                                mod_partajare:it.mod_partajare,
                                cuvinte_cheie:it.cuvinte_cheie,
                                creation_date:it.getCreationDate()
                            });

                    }

                    res.status(200).send(JSON.stringify(jsonRes));
                }
                catch(err)
                {
                    if(err.status!=undefined)
                    {
                        if(err.status>=500) 
                            log.print("Session",err.message);
            
                        res.status(err.status).send(err.message);
                    }
                    else
                    {
                        log.print("Session","Undefiend Error");
                        log.print("Session",err.message);
                        res.status(500).send("Internal Sever Problem");
                    }
                }
            });
        
            router.post("/user",async (req,res)=>
                {
                    try
                    {
                        if(typeof req.body.id !=='string')
                            throw new Server_Error("Invalid Data Reached The Server",403);
        
                        const userIp= req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                        let result = await model.validSession(req.body.id,userIp);
                        
                        if(!result)
                        {
                            throw new Server_Error("Invalid Data Reached The Server",403);
                        }
                
                        const user = await usermodel.sessionGetUser(req.body.id,userIp);
                        
                        let jsonRes = {
                            user_id:user.getId(),
                            username:user.username,
                            first_name:user.firstName,
                            last_name:user.lastName,
                            email:user.email,
                            creation_date:user.getCreationDate(),
                            profile_image:user.profile_image
                        }
    
                        res.status(200).send(JSON.stringify(jsonRes));
                    }
                    catch(err)
                    {
                        if(err.status!=undefined)
                        {
                            if(err.status>=500) 
                                log.print("Session",err.message);
                
                            res.status(err.status).send(err.message);
                        }
                        else
                        {
                            log.print("Session","Undefiend Error");
                            log.print("Session",err.message);
                            res.status(500).send("Internal Sever Problem");
                        }
                    }
                });

module.exports = router;

