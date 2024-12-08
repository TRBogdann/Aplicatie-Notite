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
        if(formchecker.check(user)==0)
        {
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
    }
    #database;
}

module.exports = UserModel;