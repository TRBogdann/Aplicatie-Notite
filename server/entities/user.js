const Server_Error = require("../util/errors");
const encryptor = require("../util/encryptor");

class User
{
    static createId()
    {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*#@$*^%+_!~?<>';
        const time = new Date();
        let result = ""+time.getFullYear()+time.getMonth()+time.getDay()+
                        time.getHours()+time.getMinutes()+time.getSeconds()+time.getMilliseconds();
        for (let i = 0; i < 40; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
        
    }
    constructor(formData,passHash)
    {   
        if(typeof formData == "object")
        {
            this.#user_id = User.createId();
            this.lastName = formData.lastname;
            this.firstName = formData.firstname;
            this.username = formData.username;
            this.email = formData.email;
            this.passHash = passHash;
        }   
        else
            throw new Server_Error("Invalid Reached the Server",403);
    }


    static createInstance(queryRow)
    {
        const user = new User({},"");
        user.#user_id = queryRow['user_id'];
        user.lastName = queryRow['last_name'];
        user.firstName = queryRow['first_name'];
        user.passHash = "";
        user.email = queryRow['email'];
        user.username = queryRow['username'];
        user.#profile_image = queryRow['profile_image'];
        user.#creation_date = queryRow['creation_date'];
        user.#verifed = queryRow['verified'];
        return user;
    }


    static async getHash(password)
    {
        return encryptor.hashPassword(password);
    }

    getId()
    {
        return this.#user_id;
    }
    
    #user_id;
    #profile_image = null;
    #creation_date = "";
    #verifed = 0;
}

module.exports = User;