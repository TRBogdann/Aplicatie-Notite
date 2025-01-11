const DataBase = require('../util/database')
const formchecker = require('../util/formchecker');
const Server_Error = require('../util/errors');
const encrypt = require('../util/encryptor');
const Group = require('../entities/group');

class GroupModel
{
    /**
     * 
     * @param {DataBase} database 
     */
    constructor(database)
    {
        this.#database =  database;
    }

    async getGroups(admin_id)
    {
        const result = await this.#database.runQuery(`SELECT * FROM NGROUPS WHERE admin_id='${admin_id}'`);
        const li = []
        for(let it of result)
        {
            li.push(Group.createInstance(it));
        }
        return li;
    }

    /**
     * 
     * @param {Group} group 
     */
    async createGroup(group)
    {
        await this.#database.runQuery(`INSERT INTO NGROUPS VALUES('${group.getGroupId()}','${group.group_name}',null,'${group.group_description}',CURRENT_TIMESTAMP,'${group.getAdminId()})`);
    }
    
    #database;
}

module.exports = GroupModel;