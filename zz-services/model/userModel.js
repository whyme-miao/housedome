const dbConfig = require("../utils/db")
const bcrypjs = require("bcryptjs")
const dayjs = require("dayjs")

module.exports = {
  postUser(req, res) {
    const sql = "insert into user(address,name,sex,avatar,username,password,number) VALUES(?,?,?,?,?,?,?)"
    const { address, name, sex, avatar, username, number } = req.body
    password = bcrypjs.hashSync(req.body.password, 10)
    const sqlArr = [address, name, sex, avatar, username, password, number]
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '插入错误');
        return
      }
      res.send("插入成功")
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  updateUser(req, res) {
    const sql = "update user set sex= ?, avatar= ?, number= ?, address=?, password=? where id = ?"
    const { sex, avatar, number, address, id } = req.body
    let password = bcrypjs.hashSync(req.body.password, 10)
    const sqlArr = [sex, avatar, number, address, password, id]
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '更新错误');
        return
      }
      res.send("更新成功")
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  checkUser(req, res) {
    const sql = "select * from user where username =?"
    const { username, password } = req.body
    console.log(req.body);
    const sqlArr = [username]
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '更新错误');
        return
      }
      if (result.length === 0) {
        res.send("用户还未注册")
      } else {
        if (bcrypjs.compareSync(password, result[0].password)) {
          res.send("登录成功")
        } else {
          res.send("密码错误")
        }
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  insertOrder(req, res) {
    // 服务类型，工作经验，员工ID，顾客ID，雇佣天数，服务薪水
    const sql = "insert into servicerecord(type,employeeid,userid,day,salary,hiredate,status) values(?,?,?,?,?,?,?)"
    const hiredate = dayjs().valueOf()
    const status = "未安排"
    const { type, employeeid, userid, day, salary } = req.body
    const sqlArr = [type, employeeid, userid, day, salary, hiredate, status]
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '插入错误');
        return
      }
      res.send("插入成功")
    }
    console.log(sqlArr);
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  getUserOrder(req, res) {
    const sql = "SELECT servicerecord.id,user.name,servicerecord.status,servicerecord.salary,employee.name AS employeename,servicerecord.type,servicerecord.day,servicerecord.hiredate FROM servicerecord,user,employee WHERE servicerecord.employeeid = employee.employeeid  AND servicerecord.userid = user.id and servicerecord.userid = ? "
    const sqlArr = req.params.id
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '查询错误');
        return
      }
      res.send(result)
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  putOrder(req, res) {
    const sql = "update servicerecord set status = ? where servicerecord.id = ?"
    const { status, id } = req.body
    console.log(req.body);
    const sqlArr = [status, id]
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '更新错误');
        return
      }
      console.log(result);
      result.affectedRows > 0 ? res.send("更新成功") : res.send("更新失败")
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  getUserInfo(req,res){
    const sql = "SELECT id,address,name,sex,avatar,username,number FROM user WHERE user.id = ?"
    const sqlArr = req.params.id
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '查询错误');
        return
      }
      res.send(result)
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  selectUserName(req,res){
    const sql = `select * from user where name like '%${req.body.name}%' `
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '查询错误');
        return
      }
      res.send(result)
    }
    dbConfig.sqlConnect(sql, callBack)
  },
  getAllOrder(req,res){
    const sql = "SELECT servicerecord.id,servicerecord.type,servicerecord.hiredate,servicerecord.`day`,servicerecord.`status`,servicerecord.salary,`user`.`name`,employee.`name` as employeename,`user`.id as userid FROM servicerecord , `user` ,employee WHERE servicerecord.userid = `user`.id AND servicerecord.employeeid = employee.employeeid"
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '查询错误');
        return
      }
      res.send(result)
    }
    dbConfig.sqlConnect(sql, callBack)
  },
  getAlluser(req, res){
    const sql = "SELECT id,address,name,sex, avatar,username,number FROM user"
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '查询错误');
        return
      }
      res.send(result)
    }
    dbConfig.sqlConnect(sql, callBack)
  }
}
/**
 * 加密处理 - 同步方法
 * bcryptjs.hashSync(data, salt)
 *    - data  要加密的数据
 *    - slat  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
 */
/**
 * 校验 - 使用同步方法
 * bcryptjs.compareSync(data, encrypted)
 *    - data        要比较的数据, 使用登录时传递过来的密码
 *    - encrypted   要比较的数据, 使用从数据库中查询出来的加密过的密码
 */
