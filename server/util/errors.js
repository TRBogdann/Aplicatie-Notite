
class Server_Error extends Error
{
    constructor(message,status)
    {
        super(message);
        this.status = status;
    }
}

module.exports = Server_Error;