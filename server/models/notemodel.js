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
        await this.#database.runQuery(`INSERT INTO NOTES VALUES('${note.getNoteId()}',${note.mod_partajare},'${note.md_data}','${note.cuvinte_cheie}','${note.getUserId()}')`);
    }
    #database;
}

module.exports = NoteModel;