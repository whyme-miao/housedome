// 1. 引入MySQL对象
const mysql = require("mysql");

// 2. 创建数据库连接对象
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "limeijuan",
  database: "household",
  port: "3306"
})

// 3. 连接数据库
connection.connect()

function sqlConnect(sql, sqlArr, callBack) {
  connection.query(sql, sqlArr, callBack)
}

connection.end()
module.exports = {
  sqlConnect
}
// console.log('连接数据库成功');
// let sql = "select name,address from employee"
// connection.query(sql, (err, result) => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   result.forEach(row => {
//     console.log(row.name, row.address);
//   });
// })
// let sql = "insert into employee (name,sex,class,number,address,birthDate) values (?,?,?,?,?,?)"
// const date = "2019-01-01".valueOf()
// connection.query(sql, ['王三', '男', 0, '13426434642', '广西省桂平市XX号', date], (err, result) => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   if (result.affectedRows !== 0) {
//     console.log('插入成功',result);
//   } else {
//     console.log('插入失败');
//   }
// })
// let sql = "delete from employee where workNumber = ? "
// let sql = "update employee set name = ? where workNumber = ?"
// connection.query(sql, ['黎美娟', 3], (err, result) => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   if (result.affectedRows !== 0) {
//     console.log('更新成功', result);
//   } else {
//     console.log('更新失败');
//   }
// })


// // 引入MySQL模块
// const mysql = require('mysql');
// module.exports = {
//   config: {
//     // 数据库配置
//     host: "localhost",
//     port: "3306",
//     user: "root",
//     password: "limeijuan",
//     database: "household"
//   },
//   // 连接数据库，使用MySQL的连接池连接方式
//   // 连接池对象
//   sqlConnect: function (sql, sqlArr, callBack) {
//     var pool = mysql.createPool(this.config);
//     pool.getConnection((err, conn) => {
//       console.log(conn, '111');
//       if (err) {
//         console.log(err, '连接失败');
//         return
//       }
//       // 事件驱动回调
//       conn.query(sql, sqlArr, callBack)
//       // 释放连接
//       conn.release();
//     })
//   }
// }