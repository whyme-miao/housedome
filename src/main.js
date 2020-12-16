import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 引入全局样式表
import './assets/css/global.css'
// 引入elementui
import ElementUI from 'element-ui';
import { Message, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:3000/'
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.level = window.sessionStorage.getItem('level')
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false
Vue.filter('dateFormat', function(originVal){
  const dt = new Date(originVal *1 )
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
