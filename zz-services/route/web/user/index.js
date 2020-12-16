const express = require("express");
const router = express.Router();
const user = require("../../../model/userModel")
//处理文件
require("../../../middleware/file")(router)
// 1. 顾客注册
router.post("/register",user.postUser)
// 2. 修改顾客信息
router.put('/',user.updateUser)
// 3.登录查询
router.post("/login",user.checkUser)
// 4. 顾客订单
router.post("/order",user.insertOrder)
// 5.查询某个顾客订单
router.get("/order/:id",user.getUserOrder)
// 6.修改订单
router.put("/order",user.putOrder)
// 7.查询顾客信息
router.get("/info/:id",user.getUserInfo)
// 8.模糊查询
router.post("/info",user.selectUserName)
// 9.查询全部订单
router.get("/allorder",user.getAllOrder)
// 10.查询全部顾客信息
router.get("/alluser",user.getAlluser)
module.exports = router