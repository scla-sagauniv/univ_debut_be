const mysql = require('mysql');
const fs = require('fs');
exports.__esModule = true;

var config =
{
    host: process.env["MYSQL_HOST"],
    user: process.env["MYSQL_USER"],
    password: process.env["MYSQL_PASSWORD"],
    database: process.env["MYSQL_DB"],
    port: 3306,
    // ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
};

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");
           queryDatabase();
    }
});

function queryDatabase(){
    conn.query('INSERT INTO inventory (task,status) VALUES (?, ?);', ['banana', "container1"], 
            function (err, results, fields) {
                if (err) throw err;
        else console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    conn.query('INSERT INTO inventory (task,status) VALUES (?, ?);', ['apple', "container2"], 
        function (err, results, fields) {
                if (err) throw err;
        console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    conn.query('INSERT INTO inventory (task,status) VALUES (?, ?);', ['orange', "container3"],  
        function (err, results, fields) {
                if (err) throw err;
        console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    conn.end(function (err) { 
    if (err) throw err;
    else  console.log('Done.') 
    });
};