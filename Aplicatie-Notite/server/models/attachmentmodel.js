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
        const encodedByteData = Buffer.from(file.byte_data, 'utf-8').toString('base64');
        await this.#database.runQueryParams(
            `INSERT INTO ATACHMENTS (file_id, name, creation_date, note_id, byte_data) VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?)`,
        [file.getFileId(), file.name, file.getNoteId(), encodedByteData]
);
    }
    #database;
}

module.exports = AtachmentModel;