const mysql = require('mysql2/promise');
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

// ここまで接続

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const user_id = (req.query.user_id);

    const conn = await mysql.createConnection(config);
    const ins = async() => {

        await conn.query('INSERT INTO tasks (task, status) VALUES (?, ?);', ['mysql','container1'])
        await conn.query('INSERT INTO tasks (task, status) VALUES (?, ?);', ['css','container1'])
        await conn.query('INSERT INTO tasks (task, status) VALUES (?, ?);', ['html','container1'])
        await conn.query('INSERT INTO tasks (task, status) VALUES (?, ?);', ['node','container1'])
    }
    ins();
    const [rows, fields] = await conn.query('SELECT * FROM tasks WHERE user_id = ?;', 1);

    const tasks = rows.map(row => {
        return {
            id: row.id,
            title: row.task,
            container: row.status
        };
    });

    console.log(tasks);
    
    context.res = {
        status: 200,
        body: tasks
    };
}