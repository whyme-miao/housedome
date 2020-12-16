const dbConfig = require("../utils/db")
const dayjs = require("dayjs")
module.exports = {
  // 1. 获取全部部门员工的信息
  getAllEmployee(req, res) {
    const sql = "select * from employee"
    const sqlArr = []
    const callBack = (err, result) => {
      if (err) {
        console.log(err, "查询失败");
      } else {
        res.send({
          result
        })
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  // 2. 删除员工信息
  deleteEmployee(req, res) {
    const sqlArr = JSON.parse(req.params.id)
    function getMark(arr) {
      let result = ""
      for (let i = 0; i < arr.length; i++) {
        result += "?,"
      }
      return result.slice(0, -1)
    }
    const sql1 = `delete from employee where employeeid in(${getMark(sqlArr)})`
    const sql2 = `delete from employee where employeeid = ?`
    const callBack = (err, result) => {
      if (err) {
        console.log(err, "删除失败");
      }
      result.affectedRows > 0 ? res.send("删除成功") : res.send("删除失败")
    }
    if (Array.isArray(sqlArr)) {
      dbConfig.sqlConnect(sql1, sqlArr, callBack)
    } else {
      dbConfig.sqlConnect(sql2, sqlArr, callBack)
    }

  },
  // 3. 增加员工
  addEmployee(req, res) {
    console.log('kkkkkkkkkkkkkkkkkkkk');
    const sql = "insert into employee(name,sex,section,number,idcard,address,birthdate,political,state) values (?,?,?,?,?,?,?,?,?)"
    const { name, sex, section, number, address, birthdate,idcard, political } = req.body
    const state = '未雇佣'
    const date = dayjs(birthdate).valueOf();
    const sqlArr = [name, sex, section, number,idcard, address, date, political,state]
    const callBack = (err, result) => {
      if (err) {
        console.log(err, "增加员工失败");
        return
      }
      result.affectedRows > 0 ? res.status(200).send("添加员工成功") : res.status(400).send("添加员工失败")
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  // 4. 修改员工信息
  updateEmployee(req, res) {
    // update table1 set field1=value1 where 范围
    const sql = "update employee set name = ?, sex=?, section=?, number=?, address=?,birthdate=?, political=? where employeeid=?"
    const { name, sex, section, number, address, birthdate, political, employeeid } = req.body
    const date = dayjs(birthdate).valueOf();
    const sqlArr = [name, sex, section, number, address, date, political, employeeid]
    console.log(req);
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '修改失败');
        return
      }
      result.affectedRows > 0 ? res.send("修改员工信息成功") : res.status(400).send("修改员工信息失败")
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  // 5. 获取某一个员工的信息
  getOneEmployeeData(req, res) {
    const sql = "select * from employee where employeeid = ?"
    const sqlArr = req.params.id
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '获取失败');
        return
      }
      result.length !== 0 ? res.send(result[0]) : res.status(400).send("查询失败")
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  // 6. 查询全部员工的服务类型
  getAllEmployeeServiceType(req, res) {
    const sql = "select name,type,workExperience from employee,servicetype where employee.employeeid = servicetype.employeeid"
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '获取失败');
        return
      }
      res.send(result)
    }
    dbConfig.sqlConnect(sql, callBack)
  }
}