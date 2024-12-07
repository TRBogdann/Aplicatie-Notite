const log = require("./log");

class DataBase
{
    #mysql;
    #connection;
    #text;

    constructor(connectionData, text = 'Connection')
    {
        this.#text = text;
        this.#mysql = require('mysql');
        this.#connection = this.#mysql.createConnection(connectionData);
        
        this.#connection.connect((err)=>
        {
            if(err)
            {
                log.print(this.#text, 'Error: Could not connect to Database');
                log.print(this.#text, err.message);
                throw err;
            }
            else
                log.print(this.#text, 'Connected to Database');
        })
    }

    runQuery(query) {
        return new Promise((resolve, reject) => {
          this.#connection.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        });
      }
}

module.exports = DataBase;