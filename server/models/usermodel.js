const DataBase = require('../util/database')
const User = require('../entities/user');
const formchecker = require('../util/formchecker');
const Server_Error = require('../util/errors');
const encrypt = require('../util/encryptor');

class UserModel
{
    /**
     * 
     * @param {DataBase} database 
     */
    constructor(database)
    {
        this.#database =  database;
    }

    /**
     * 
     * @param {User} user 
     */
    async createAccount(user)
    {   
        const exists = await this.exists(user);
        
        if(exists!=0) 
        {
            let message = exists==1?"Username exists":"Email already associated with another account";
            throw new Server_Error(message,403);
        }

        const query = `INSERT INTO USERS VALUES('${user.getId()}','${user.lastName}','${user.firstName}','${user.passHash}','${user.email}',0,NULL,CURRENT_TIMESTAMP,'${user.username}');`;
        try
        {
            const result = await this.#database.runQuery(query);
                
        }
        catch(err)
        {
            throw new Server_Error("Server Response: Invalid Data Reached Server; DataBase Response: "+err.message,500);
        }

    }

    /**
     * 
     * @param {User} user 
     */
    async exists(user)
    {
        const resultUsername = await this.#database.runQuery(`SELECT COUNT(*) as result FROM USERS WHERE username='${user.username}'`);
        
        if(resultUsername[0]['result'] > 0) return 1;

        const resultEmail = await this.#database.runQuery(`SELECT COUNT(*) as result FROM USERS WHERE email='${user.email}'`);

        return resultEmail[0]['result'] > 0 ? 2:0;
    }
    #database;

    async verify(user_id)
    {
        await this.#database.runQuery(`UPDATE USERS SET verified = 1 WHERE user_id = '${user_id}'`);
    }

    async getUser(username,password)
    {
        const result = await this.#database.runQuery(`SELECT * FROM USERS WHERE username='${username}' OR email='${username}';`);
        
        if(result.length==0)
            return undefined;
        
        const verified = result[0]['verified'];
        const hash = result[0]['passward_hash'];
        const valid = await encrypt.checkPassword(password,hash);

        if(verified == 0)
            return "";

        if(valid)
            return User.createInstance(result[0]);

        return null;
    }

    async sessionGetUser(session_id,user_ip)
    {
        let result = await this.#database.runQuery(`SELECT us.* FROM USERS us JOIN SESSIONS s ON us.user_id = s.user_id WHERE session_id='${session_id}' AND user_ip='${user_ip}'`); 
        if(result.length < 1)
            return null;
        else 
            return User.createInstance(result[0]);
    }

    async getFriends(user_id)
    {

        const result1 = await this.#database.runQuery(`SELECT u.* FROM FRIENDS f JOIN USERS u on f.user2_id = u.user_id WHERE f.user1_id = '${user_id}'`); 
        const result2 = await this.#database.runQuery(`SELECT u.* FROM FRIENDS f JOIN USERS u on f.user1_id = u.user_id WHERE f.user2_id = '${user_id}'`); 
        const friends = [];
        for(const it of result1)
        {
            friends.push(User.createInstance(it));
        }
        for(const it of result2)
        {
            friends.push(User.createInstance(it));
        }
        return friends;
    }
}   

module.exports = UserModel;