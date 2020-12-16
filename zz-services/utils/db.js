const mysql = require("mysql");

const config = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "household",
  port: "3306"
}
module.exports = {
  sqlConnect: (sql, sqlArr, callBack) => {
    const connection = mysql.createConnection(config);
    // 建立连接
    connection.connect();
    connection.query(sql, sqlArr, callBack)
    // 释放连接
    connection.end()
  }
}