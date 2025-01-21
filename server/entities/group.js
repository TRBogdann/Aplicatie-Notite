const Server_Error = require("../util/errors");

class Group
{
    constructor(formData,user_id)
    {
        if(typeof formData =='object')
        {
            this.group_name = formData.group_name;
            this.#group_id = Group.createId();
            this.group_description = formData.group_description;
            this.#admin_id = user_id;
        }
         else throw new Server_Error("Invalid Data Reached The Server",403);

    }

    static createId()
    {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const time = new Date();
        let result = ""+time.getFullYear()+time.getMonth()+time.getDay()+
                        time.getHours()+time.getMinutes()+time.getSeconds()+time.getMilliseconds();
        for (let i = 0; i < 40; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
        
    }

    getGroupId()
    {
        return this.#group_id;
    }

    getCrationDate()
    {
        return this.#creation_date;
    }

    getAdminId()
    {
        return this.#admin_id;
    }

    static createInstance(queryRow)
    {
        const res = new Group({},"");
        res.#admin_id = queryRow['admin_id'];
        res.#group_id = queryRow['ngroup_id'];
        res.#creation_date = queryRow['creation_date'];
        res.group_name = queryRow['group_name'];
        res.group_image = queryRow['group_image'];
        res.group_description = queryRow['group_description']

    
        return res;
    }
    
    #group_id;
    #creation_date="";
    #admin_id;
    group_name;
    group_description;
    group_image=null;
}

module.exports = Group;