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
        await this.#database.runQuery(`INSERT INTO NGROUPS VALUES('${group.getGroupId()}','${group.group_name}',null,'${group.group_description}',CURRENT_TIMESTAMP,'${group.getAdminId()}')`);
    }

    async addUserToGroup(username,group_id)
    {
        const res = await this.#database.runQuery(`SELECT user_id FROM USERS WHERE username='${username}'`);
        if(res.length>0){
        const user_id = res[0]['user_id'];
        await this.#database.runQuery(`INSERT INTO GROUP_LINK VALUES('${user_id}','${group_id}')`)
        }
    }

    async addNoteToGroup(group_name,user_id,note_id)
    {
        const res = await this.#database.runQueryParams('SELECT g.ngroup_id AS res FROM NGROUPS g JOIN GROUP_LINK l ON g.ngroup_id = l.ngroup_id JOIN USERS u ON u.user_id = l.user_id WHERE u.user_id = ? AND g.group_name = ?',[user_id,group_name]);
        if(res.length>0)
            await this.#database.runQueryParams('INSERT INTO GROUP_NOTES VALUES(?,?)',[note_id,res[0]['res']]);
    }
    #database;
}

module.exports = GroupModel;