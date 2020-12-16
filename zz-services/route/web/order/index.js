const express = require("express");
const router = express.Router();
const order = require("../../../model/orderModel")

// 添加评价
router.post("/", order.insertOrder)
// 获取某个顾客的评分
router.get("/user/:id",order.getRating)
// 获取全部评价
router.get("/all",order.getAllRating)
module.exports = router