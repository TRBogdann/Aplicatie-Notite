const UserRequest = require("../entities/request");
const DataBase = require("../util/database");

class RequestModel
{
    /**
     * 
     * @param {DataBase} database 
     */
    constructor(database)
    {
        this.#database = database;
    }

    /**
     * 
     * @param {UserRequest} req 
     */
    async createRequest(req)
    {
        this.#database.runQuery(`INSERT INTO REQUESTS VALUES('${req.token}','${req.requestType}','${req.userId}',CURRENT_TIMESTAMP);`)
    }

    /**
     * 
     * @param {string} token 
     */
    async deleteRequest(token)
    {
        this.#database.runQuery(`DELETE FROM REQUESTS WHERE token='${token}'`);
    }

    /**
     * 
     * @param {string} token 
     */
    async exists(token)
    {
        const result = await this.#database.runQuery(`SELECT COUNT(*) AS result FROM REQUESTS WHERE token='${token}'`);
        return Number(result[0]['result']) > 0;
    }

    async getRequest(token)
    {
        const result = await this.#database.runQuery(`SELECT * FROM REQUESTS WHERE token='${token}'`);
        return UserRequest.createInstance(result[0]['token'],result[0]['user_id'],result[0]['request_type']);
    }

    async deleteRequest(token)
    {
        this.#database.runQuery(`DELETE FROM REQUESTS WHERE token='${token}'`);
    }
    #database;
}

module.exports = RequestModel;