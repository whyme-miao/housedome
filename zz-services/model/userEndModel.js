const dbConfig = require("../utils/db")

module.exports = {
  checkUser(req, res) {
    const sql = "select * from userend where username = ?"
    const { username, password } = req.body
    const sqlArr = [username]
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '查询错误');
        return
      }
      if (result.length === 0) {
        res.send({msg:"没有该用户",code:401})
      } else {
        const { id, username, avatar, role_name } = result[0]
        result[0].password === password ? res.send({id, username, avatar, role_name}) : res.send({msg:"密码错误",code:401})
      }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  },
  selectRoleName(req,res){
    const sql = "SELECT role.level,power.authName,power.id,power.desc FROM userend ,role ,power WHERE userend.role_name = role.name AND userend.role_name = ? AND role.level = power.level "
    const sqlArr=req.params.name
    const callBack = (err, result) => {
      if (err) {
        console.log(err, '查询错误');
        return
      }
      console.log(result[0].level);
      req.level = result[0].level
      res.send(result)
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
  }
}