const Atachment = require('../entities/atachment');
const Note = require('../entities/note');
const DataBase = require('../util/database')
const Server_Error = require('../util/errors');

class AtachmentModel
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
     * @param {Atachment} file 
     */
    async createAttachment(file)
    {
        

        console.log(file.byte_data);
        const encodedByteData = Buffer.from(file.byte_data,"utf-8");
        
        await this.#database.runQueryParams(
            `INSERT INTO ATACHMENTS (file_id, name, creation_date, note_id, byte_data) VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?)`,
        [file.getFileId(), file.name, file.getNoteId(), encodedByteData]
    );
    }

    async getAttachments(note_id)
    {
        const result = await this.#database.runQueryParams('SELECT a.* FROM ATACHMENTS a JOIN NOTES n ON n.note_id = a.note_id WHERE a.note_id = ?',[note_id]);
        const list = [];
        for(const it of result)
        {
            console.log(it);
            list.push(Atachment.createInstance(it));
        }

        return list
    }

    #database;
}

module.exports = AtachmentModel;