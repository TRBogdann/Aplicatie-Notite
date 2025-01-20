
class UserRequest
{
    constructor(userId,type)
    {
        this.requestType = type;
        this.userId = userId;
        this.token = this.genToken();
    }

    genToken()
    {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const time = new Date();
        let result = this.requestType+time.getFullYear()+time.getMonth()+time.getDay()+
                        time.getHours()+time.getMinutes()+time.getSeconds()+time.getMilliseconds();
        for (let i = 0; i < 40; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }


    static createInstance(token,userID,requestType)
    {
        const req = new UserRequest("","");
        
        req.token = token;
        req.userId = userID;
        req.requestType = requestType;

        return req;
    }

}

module.exports = UserRequest;