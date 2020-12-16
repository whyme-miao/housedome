import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome.vue'
import Employee from '../components/employee/Employee.vue'
import Service from '../components/employee/Service.vue'
import AddEdit from '../components/employee/AddEdit.vue'
import Order from '../components/order/Order.vue'
import Client from '../components/client/Client.vue'
// import ShowEchart from '../components/echart/ShowEchart.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login'},
  { path: '/login', component: Login},
  { 
    path: '/home', 
    component: Home, 
    redirect: '/welcome',
    children:[
      { path: '/welcome', component: Welcome },
      { path: '/employee', component: Employee },
      { path: '/order', component: Order },
      { path: '/service', component: Service },
      { path: '/addedit', component: AddEdit,},
      { path: '/client', component: Client },
      // { path: '/show', component: ShowEchart },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next()放行  next('/login') 强制跳转
  if(to.path === '/login') return next()
  // 获取token
  const levelStr = window.sessionStorage.getItem('level')
  if(!levelStr) return next('/login')
  next()

})

export default router
