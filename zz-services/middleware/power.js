const dbConfig = require("../utils/db")

module.exports = async (req, res, next) => {
  const sql = "SELECT * FROM power WHERE power.level >= ?"
  const sqlArr = req.headers.level;
  if (!sqlArr) {
    res.send({ msg: "header错误,请传入level参数", code: 400 })
  }
  const callBack = (err, result) => {
    if (err) {
      console.log(err, '查询错误');
      return
    }
    let isGo = false;
    result.forEach(item => {
      if (item.level >= sqlArr && item.path === req.baseUrl && (item.options === req.method || item.options === '/')) {
        isGo = true
      }
    });
    isGo ? next() : res.send({ code: 401, msg: "该用户无权限" })
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}