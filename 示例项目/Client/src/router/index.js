import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/home/Index'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
// import store from '@/store'
import {getCookie} from '@/assets/tool'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/main',
      name: 'main',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: Main
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 通过vuex state获取当前的token是否存在
    // console.log(isEmptyObject(store.state.user))
    // if (!isEmptyObject(store.state.userInfo)) {
    if (getCookie('username')) {
      next()
    } else {
      console.log(to.fullPath)
      next({
        path: '/Login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

// function isEmptyObject (obj) {
//   for (var key in obj) {
//     return false
//   }
//   return true
// }

export default router
