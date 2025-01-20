
const log = (function()
{
    return{
        print:(key,message)=>{
            console.log(key+" : "+"["+message+"]");
        }
    }
}());

module.exports = log;