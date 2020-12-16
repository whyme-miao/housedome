const express = require("express");
const router = express.Router();
const service = require("../../../model/serviceModel")
// 6. 获取全部员工服务类型
router.get("/",service.getAllEmployeeServiceType)
// 7. 查询某个员工的服务类型
router.get("/:id",service.getEmployeeServiceType)
// 8. 根据服务类型查询员工
router.post("/employee",service.typeSelectEmployee)
module.exports = router