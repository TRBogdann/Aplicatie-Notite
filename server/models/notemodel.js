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
        const query = `
        INSERT INTO NOTES 
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
      
      const params = [
        note.getNoteId(),        
        note.mod_partajare,      
        note.md_data,            
        note.cuvinte_cheie,      
        note.getUserId() 
      ];
      
        await this.#database.runQueryParams(query, params);

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

    //0 -- User 1 -- viewGuest    2 -- EditGuest
    async findNote(user_id,note_id,access = 2)
    {
        let result = await this.#database.runQuery(`SELECT n.* FROM NOTES n JOIN USERS u ON u.user_id = n.user_id WHERE n.note_id = '${note_id}' AND u.user_id = '${user_id}'`);
        
        if(result.length>0)
            return Note.createInstance(result[0]);

       
        result = await this.#database.runQuery(`SELECT n.* FROM NOTES n JOIN GROUP_NOTES gn ON gn.note_id = n.note_id JOIN NGROUPS g ON g.ngroup_id=gn.ngroup_id WHERE g.ngroup_id IN (SELECT g.ngroup_id FROM NGROUPS g JOIN GROUP_LINK l ON g.ngroup_id=l.ngroup_id JOIN USERS u ON u.user_id = l.user_id WHERE u.user_id = '${user_id}') AND n.note_id = '${note_id}'`);

        if(result.length>0)
            return Note.createInstance(result[0]);

        if(access==2){
        result = await this.#database.runQuery(`SELECT * FROM NOTES WHERE mod_partajare>0 AND note_id = '${note_id}'`);

        if(result.length>0)
            return Note.createInstance(result[0]);
    }
        return null;
    }

    /**
     * 
     * @param {Note} note 
     */
    async deleteNote(note)
    {
        await this.#database.runQuery(`DELETE FROM ATACHMENTS WHERE note_id='${note.getNoteId()}'`);
        await this.#database.runQuery(`DELETE FROM GROUP_NOTES WHERE note_id='${note.getNoteId()}'`);
        await this.#database.runQuery(`DELETE FROM NOTES WHERE note_id='${note.getNoteId()}'`);
    }
    
     /**
     * 
     * @param {Note} note 
     */
    async update(note)
    {
        await this.#database.runQueryParams("UPDATE NOTES SET md_data = ? , mod_partajare = ? , cuvinte_cheie = ? WHERE note_id = ?;",[note.md_data,note.mod_partajare,note.cuvinte_cheie,note.getNoteId()]);
    }

    #database;
}

module.exports = NoteModel;