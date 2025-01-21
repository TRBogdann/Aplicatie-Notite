const Server_Error = require("../util/errors");

class Atachment
{
    constructor(formData,note_id)
    {
        if(typeof formData == 'object')
        {
            this.#file_id = Atachment.createId();
            this.#note_id = note_id;
            this.byte_data = formData.byte_data;
            this.name = formData.name;
        }
         else throw new Server_Error("Invalid Data Reached The Server",403);

    }

    static createId()
    {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*#@$*^%+_!~?<>';
        const time = new Date();
        let result = ""+time.getFullYear()+time.getMonth()+time.getDay()+
                        time.getHours()+time.getMinutes()+time.getSeconds()+time.getMilliseconds();
        for (let i = 0; i < 40; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
        
    }

    getNoteId()
    {
        return this.#note_id;
    }

    getCrationDate()
    {
        return this.#creation_date;
    }

    getFileId()
    {
        return this.#file_id;
    }

    static createInstance(queryRow)
    {
        const instance = new Atachment({},"");

        console.log(queryRow["byte_data"]);
        instance.#file_id = queryRow["file_id"];
        instance.name = queryRow["name"];
        instance.#creation_date = queryRow["creation_data"];
        instance.#note_id = queryRow["note_id"];
        instance.byte_data = queryRow["bytE_data"];

        return instance;
    }
    
    #file_id;
    #creation_date="";
    #note_id;
    name;
    byte_data;
}

module.exports = Atachment;