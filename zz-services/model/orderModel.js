const dbConfig = require("../utils/db")
module.exports = {
  insertOrder(req, res) {
    const sql = "insert into evaluate(orderid,rate,employeeid,evaluate,userid) values(?,?,?,?,?)";
    const { orderid, rate, employeeid, evaluate, userid } = req.body;
    const sqlArr = [orderid, rate, employeeid, evaluate, userid]
    const callBack = (err, result) => {
      if (err) {
        console.log(err, "添加失败");
        return
      }
      // console.log(res);
      res.send("插入成功")
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
    function updateRating(id) {
      const sql = "UPDATE employee,evaluate SET employee.avgscore =  evaluate.rate WHERE employee.employeeid = evaluate.employeeid AND evaluate.employeeid = ?"
      const sqlArr = id;
      const callBack = (err, result) => {
        if (err) {
          console.log(err, "添加失败");
          return
        }
        console.log("更新成功");
        console.log(result);
      }
      dbConfig.sqlConnect(sql, sqlArr, callBack)
    }
    updateRating(employeeid)
  },
  getRating(req, res) {
    const sql = "SELECT evaluate.evaluate,evaluate.rate,employee.name as employee,`user`.`name`,`user`.avatar FROM evaluate ,`user` ,employee WHERE evaluate.employeeid = employee.employeeid AND evaluate.userid = `user`.id AND`user`.id = ?"
    const sqlArr = req.params.id;
    const callBack = (err, result) => {
      if (err) {
        console.log(err, "添加失败");
        return
      }
      res.send(result)
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  getAllRating(req,res){
    const sql = "SELECT evaluate.rate,evaluate.evaluate,employee.`name` AS employeename,user.`name`,evaluate.id FROM evaluate ,employee ,`user` WHERE evaluate.employeeid = employee.employeeid AND `user`.id = evaluate.userid "
    const callBack = (err, result) => {
      if (err) {
        console.log(err, "添加失败");
        return
      }
      res.send(result)
    }
    dbConfig.sqlConnect(sql, callBack)
  }
}