const Note = require('../entities/note');
const DataBase = require('../util/database')
const Server_Error = require('../util/errors');


class NoteModel
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
     * @param {Note} note 
     */
    async createNote(note)
    {
        await this.#database.runQuery(`INSERT INTO NOTES VALUES('${note.getNoteId()}',${note.mod_partajare},'${note.md_data}','${note.cuvinte_cheie}','${note.getUserId()}',CURRENT_TIMESTAMP)`);
    }

    async getNotes(id,idType)
    {
        const notes = []
        let result;
        if(idType=='user')
        {
            result = await this.#database.runQuery(`SELECT * FROM NOTES WHERE user_id='${id}'`);
        }
        else
        {
            result = await this.#database.runQuery(`SELECT n.* FROM NOTES n JOIN GROUP_NOTES gn ON n.note_id = gn.note_id JOIN NGROUPS g ON gn.ngroup_id = g.ngroup_id WHERE g.ngroup_id = '${id}';`);
        }

        for(const it of result)
        {
            notes.push(Note.createInstance(it));
        }

        return notes;
    }
    #database;
}

module.exports = NoteModel;