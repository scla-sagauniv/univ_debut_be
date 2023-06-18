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
    //ここまで接続
    const conn = await mysql.createConnection(config);
    //ここからクエリ
    const query = 'INSERT INTO tasks (id,task, status, user_id) VALUES ?';
    const values = tasks.map(task => [id,task,status,user_id]);
    conn.query(query, [values], (err, result) => {
    if (err) throw new Error('データの登録に失敗しました');
    console.log('タスクが正常に挿入されました');
    });
    const query2 = 'INSERT INTO task_contents (id,task, quo,issue,hypo,result) VALUES ?';
    const values2 = task_contents.map(task => [id, task, status, user_id]);
    conn.query(query2, [values2], (err, result) => {
        if (err) throw new Error('データの登録に失敗しました');
        console.log('タスクが正常に挿入されました');

});
}
