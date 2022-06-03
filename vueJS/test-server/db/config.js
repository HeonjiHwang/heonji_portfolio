const mysql = require('mysql');

//.env파일 사용하기 위해 사용
require('dotenv').config();

const db_info = {
    host : process.env.mysql_config_address,
    port : process.env.mysql_config_port,
    user : process.env.mysql_config_username,
    password : process.env.mysql_config_password,
    database : process.env.mysql_config_database
}

module.exports = {
    init(){
        return mysql.createConnection(db_info);
    },
    connect(conn){
        conn.connect((err) => {
            if(err){
                console.error('mysql connection error : ' + err);
            }
            console.log('mysql is connected successfully!');
        })
    }
}