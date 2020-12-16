const adminRoute = require("./route/admin/employee")
const serviceRoute = require("./route/admin/service")
const userRoute = require("./route/web/user")
const stateRoute = require("./route/web/employee")
const rateRoute = require("./route/web/order")
const userEndRoute = require("./route/admin/user")

const path = require("path")
// 1. 导入express框架
const express = require("express");
// 2. 创建应用程序
const app = express();
// 解决JSON数据
const bodyParse = require("body-parser")
// 解决跨域
app.use(require("cors")())

app.use(bodyParse.json()) // 处理 application/json数据
app.use(bodyParse.urlencoded({ extended: true })) // 处理application/x-www-form-urlencoded
// 共享目录
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


const powerMiddleware = require("./middleware/power")
// 路由
// （1）员工信息
app.use("/employee",powerMiddleware, adminRoute)
app.use("/state",powerMiddleware, stateRoute)
// （2）服务类型信息
app.use("/service",powerMiddleware ,serviceRoute)
// （3）顾客信息
app.use("/user",powerMiddleware, userRoute)
// （4）评价信息
app.use("/rate",powerMiddleware, rateRoute)
// (5)后台员工登录
app.use("/admin",userEndRoute)

// 监听服务端口
app.listen("3000", () => {
  console.log('services is running');
})