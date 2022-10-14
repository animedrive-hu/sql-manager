const mysql = require('mysql');
var con;
var connection;
module.exports = class dbman {
    constructor(data){
        try {
            connection = mysql.createConnection(data);
            con = connection;
        } catch(e) {
            if(e) throw new Error("Something went wrong! ERR: \N"+e);
        }
    }

    async run(query, callback){
        con.connect(function(e) {
            if (e) throw new Error("Something went wrong! ERR: \N"+e);
        });
        con.query(`${query}`, function (error, results, fields) {
            if (error) throw error;
            return callback(results);
        });
        con.end();
    }
}
