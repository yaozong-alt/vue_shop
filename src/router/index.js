import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

  const routes = [
    //路由重定向
    {
      path:'/',
      redirect:"/login"
    },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫
router.beforeEach((to,form,next)=>{
  //to 将要访问的路径
  //form 代表从哪个路径跳转而来
  //next 是一个函数，表示放行
  //    next() 放行    next('/login')强制跳转到指定路径

  //若是从登录页跳转，直接放行
  if(to.path=="/login") return next()
  //若取不到值，则代表没有登录，则跳转到登录页面
  //取到值代码已经登录过，直接放行
  const tokenStr=sessionStorage.getItem("iflogin");
  if(!tokenStr) return next('/login')
  next()
})
export default router
