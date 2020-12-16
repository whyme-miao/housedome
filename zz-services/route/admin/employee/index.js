const express = require("express");
const router = express.Router();
const employee = require("../../../model/employeeModel")

// 1. 获取全部部门员工的信息
router.get("/", employee.getAllEmployee)

// 2. 删除员工信息
router.delete("/:id", employee.deleteEmployee)

// 3. 添加员工
router.post("/add", employee.addEmployee)

// 4.修改员工信息
router.put("/:id", employee.updateEmployee)

// 5. 获取某一个员工的信息
router.get("/:id", employee.getOneEmployeeData)

module.exports = router
