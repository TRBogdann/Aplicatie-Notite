const Session = require("../entities/session");
const DataBase = require("../util/database");


class SessionModel
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
     * @param {Session} session 
     */
    async createSession(session)
    {
        await this.#database.runQuery(`DELETE FROM SESSIONS WHERE user_ip='${session.getUserIp()}' AND user_id='${session.getUserId()}'`);
        await this.#database.runQuery(`INSERT INTO SESSIONS VALUES('${session.getSessionId()}',CURRENT_TIMESTAMP,'${session.getUserIp()}','${session.getUserId()}')`);
    }

    #database;
}

module.exports = SessionModel;