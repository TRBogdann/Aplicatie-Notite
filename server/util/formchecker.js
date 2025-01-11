const { format } = require("mysql");

const formchecker = (function()
{   

    /**
     * 
     * @param {string} email 
     */
    function checkEmail(email)
    {
        const mailValidator = /^\w+([\.-]?\w+)*@stud.ase\.(com|ro)$/;
        if(email.length>120 || !mailValidator.test(email))
            return false;
      
        return true;
    }

    //1 Invalid Data Reached the Server
    //2 Unchecked User Input
    //0 Ok
    function checkForm(form)
    {   
        
        if (typeof form.firstname !== "string") return 1;
        if (typeof form.lastname !== "string") return 1;
        if (typeof form.username !== "string") return 1;
        if (typeof form.password !== "string") return 1;
        if (typeof form.confirmPassword !== "string") return 1;
        if (typeof form.email !== "string") return 1;

        if (form.firstname.length > 60 || form.firstname.length<1) return 2;
        if (form.lastname.length > 120 || form.lastname.length<1) return 2;
        if (form.username.length > 72 || form.username.length<1) return 2;
        if (form.password.length > 100 || form.password.length<8) return 2;
        if (form.email.length > 120) return 2;

        if(form.password!==form.confirmPassword) return 2;
        
        if(!checkEmail(form.email)) return 2;

        if (form.firstname[0] === " ") return 2;
        if (form.lastname[0] === " ") return 2;
        if (form.password.includes(" ")) return 2;
    
        if (!/^[a-z A-Z]+$/.test(form.firstname)) return 2;
        if (!/^[a-z A-Z]+$/.test(form.lastname)) return 2;

        return 0;
    }

    function checkLogin(form)
    {
        if (typeof form.username !== "string") return 1;
        if (typeof form.password !== "string") return 1;

        if (form.username.length > 120 || form.username.length<1) return 2;
        if (form.password.length > 100 || form.password.length<8) return 2;

        if (form.password.includes(" ")) return 2;

        return 0;
    }
    
    return{
        checkForm:checkForm,
        checkEmail:checkEmail,
        checkLogin:checkLogin
    }
})()

module.exports = formchecker;