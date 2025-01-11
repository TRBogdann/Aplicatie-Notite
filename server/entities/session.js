const crypto = require('crypto');

class Session
{
    static generateSessionID() {
        return crypto.randomBytes(32).toString('hex'); // Generates a 64-character hexadecimal string
    }

    constructor(user_id,user_ip) {
        this.#user_id = user_id;
        this.#user_ip = user_ip;
        this.#session_id = Session.generateSessionID();
    }

    getSessionId()
    {
        return this.#session_id;
    }

    getUserId()
    {
        return this.#user_id;
    }

    getUserIp()
    {
        return this.#user_ip;
    }

    getCreationDate()
    {
        return this.#creation_date;
    }

    #session_id;
    #user_ip;
    #user_id;
    #creation_date = "";
}

module.exports = Session;