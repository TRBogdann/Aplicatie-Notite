const DataBase = require("./util/database");
require("dotenv").config();
const log = require("./util/log")

const connectionInfo = 
{
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

const db = new DataBase(connectionInfo,"Cleaner");

function dateDiff(date1, date2) {
  return date1 - date2;
}

setInterval(async () => {
    try
    {
        await db.runQuery("DELETE FROM SESSIONS WHERE TIMESTAMPDIFF(DAY,creation_date,CURRENT_TIMESTAMP)>5");
        await db.runQuery("DELETE FROM SESSIONS WHERE TIMESTAMPDIFF(DAY,creation_date,CURRENT_TIMESTAMP)>30");
    }
    catch(err)
    {
        log.print("Cleaner","Cleaner Failed");
        log.print("Cleaner",err.message);
    }
}, 3600000);