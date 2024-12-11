const DataBase = require('../util/database')
const User = require('../entities/user');
const formchecker = require('../util/formchecker');
const Server_Error = require('../util/errors');

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
        this.#database.runQuery(`UPDATE USERS SET verified = 1 WHERE user_id = '${user_id}'`);
    }
}   

module.exports = UserModel;