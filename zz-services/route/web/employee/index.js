const express = require("express");
const router = express.Router();
const dbConfig = require("../../../utils/db")
// 6.显示未雇佣员工列表
router.get("/", (req, res) => {
  const sql = "select * from employee where state = ?"
  const sqlArr = "未雇佣"
  const callBack = (err, result) => {
    if (err) {
      console.log(err, '获取失败');
      return
    }
    res.send(result)
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
})
// 7.修改员工雇佣状态
router.put("/", (req, res) => {
  const sql = "update employee set state = ? where employeeid = ?"
  const sqlArr = [req.body.state, req.body.id]
  const callBack = (err, result) => {
    if (err) {
      console.log(err, '更新失败');
      return
    }
    console.log(result);
    result.affectedRows > 0 ? res.send("更新成功") : res.send("更新失败")
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
})
module.exports = router