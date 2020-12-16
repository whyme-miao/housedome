const dbConfig = require("../utils/db")

module.exports = {
  // 1. 查询全部员工的服务类型和薪水
  getAllEmployeeServiceType(req, res) {
    const sql = `SELECT employee.name,salary.workExperience,salary.type,salary.salary,servicetype.time,servicetype.synopsis
    FROM employee,salary,servicetype 
    WHERE employee.employeeid = servicetype.employeeid AND servicetype.workExperience = salary.workExperience AND salary.type = servicetype.type`
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '获取失败');
        return
      }
      console.log(result);
      res.send(result)
    }
    dbConfig.sqlConnect(sql, callBack)
  },
  // 2. 查询某个员工的服务类型和薪水
  getEmployeeServiceType(req, res) {
    const sql = `SELECT employee.name,salary.workExperience,salary.type,salary.salary,servicetype.time,servicetype.synopsis
    FROM employee,salary,servicetype 
    WHERE employee.employeeid = servicetype.employeeid AND servicetype.workExperience = salary.workExperience AND salary.type = servicetype.type AND employee.employeeid = ?`
    const sqlArr = req.params.id
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '获取失败');
        return
      }
      res.send(result)
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  // 3. 根据服务类型查询员工
  typeSelectEmployee(req,res){
    const sql = `SELECT servicetype.type, employee.name, salary.salary, salary.workExperience
    FROM employee ,servicetype ,salary
    WHERE employee.employeeid = servicetype.employeeid AND servicetype.type = ? AND servicetype.workExperience = salary.workExperience AND servicetype.type = salary.type`
    const sqlArr = req.body.type
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '获取失败');
        return
      }
      res.send(result)
    }
    dbConfig.sqlConnect(sql,sqlArr, callBack)
  } 
}
