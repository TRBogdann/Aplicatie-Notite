const Server_Error = require("../util/errors");


class Note
{


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

    constructor(formData,user_id)
    {
        if(typeof formData =="object")
        {
            this.#note_id = Note.createId();
            this.md_data = formData.md_data;
            this.cuvinte_cheie = formData.cuvinte_cheie;
            this.#user_id = user_id
        }
        else throw new Server_Error("Invalid Data Reached The Server",503);
    }

    getUserId()
    {
        return this.#user_id;
    }

    getCreationDate()
    {
        return this.#creation_date;
    }

    getNoteId()
    {
        return this.#note_id;
    }

    static createInstance(queryRow)
    {
        const note = new Note({},"");
        
        note.#note_id = queryRow['note_id'];
        note.#user_id = queryRow['user_id'];
        note.cuvinte_cheie = queryRow['cuvinte_cheie'];
        note.md_data = queryRow['md_data'];
        note.mod_partajare = queryRow['mod_partajare'];
        note.#creation_date = queryRow['creation_date'];

        return note;
    }

    #note_id;
    #creation_date="";
    #user_id
    md_data;
    mod_partajare = 0;
    cuvinte_cheie;

}

module.exports = Note;