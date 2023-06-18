module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };


    const mysql = require('mysql2');
    const fs = require('fs');

    
    var config =
    {
        host: process.env["MYSQL_HOST"],
        user: process.env["MYSQL_USER"],
        password: process.env["MYSQL_PASSWORD"],
        database: process.env["MYSQL_DB"],
        port: 3306,
        ssl: {ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}
    };
    console.log(config);
    
    const conn = await mysql.createConnection(config);
    
    conn.query('SELECT 1',
    function (err, results, fields) {
        console.log(results);
        // if (err) throw err;
        // else console.log('Selected ' + results.length + ' row(s).');
        // for (i = 0; i < results.length; i++) {
        //     console.log('Row: ' + JSON.stringify(results[i]));
        // }
        // console.log('Done.');
    })
}

// const mysql = require('mysql');
// const fs = require('fs');

// var config =
// {
//     host: process.env["MYSQL_HOST"],
//     user: process.env["MYSQL_USER"],
//     password: process.env["MYSQL_PASSWORD"],
//     database: process.env["MYSQL_DB"],
//     port: 3306,
//     // ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
// };

// const conn = new mysql.createConnection(config);

// conn.connect(
//     function (err) { 
//         if (err) { 
//             console.log("!!! Cannot connect !!! Error:");
//             throw err;
//         }
//         else {
//             console.log("Connection established.");
//             readData();
//         }
//     });

//function readData(user_id){
//     conn.query('SELECT id, task, status, user_id FROM tasks WHERE id = ?;', [user_id], 
//         function (err, results, fields) {
//             if (err) throw err;
//             else console.log('Selected ' + results.length + ' row(s).');
//             for (i = 0; i < results.length; i++) {
//                 console.log('Row: ' + JSON.stringify(results[i]));
//             }
//             console.log('Done.');
//         })
//     conn.end( 
//         function (err) { 
//             if (err) throw err;
//             else  console.log('Closing connection.') 
//     });
// };