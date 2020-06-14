import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
Vue.config.productionTip = false
//配置请求的根路径
axios.defaults.baseURL="https://www.liulongbin.top:8888/api/private/v1/"
//axios请求拦截
axios.interceptors.request.use(config=>{
  //为请求头对象添加token验证的authorization字段
  console.log("congif",config);
  config.headers.Authorization=sessionStorage.getItem("iflogin")
  return config;
})
Vue.prototype.$axios=axios;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
