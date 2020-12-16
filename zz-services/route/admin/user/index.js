const express = require("express");
const router = express.Router();
const user = require("../../../model/userEndModel")
//处理文件
require("../../../middleware/file")(router)
// 登录接口
router.post("/login",user.checkUser)
// 获取角色列表
router.get("/role/:name",user.selectRoleName)

module.exports = router