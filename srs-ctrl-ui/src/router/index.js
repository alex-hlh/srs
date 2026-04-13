import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'
import { getToken } from '@/utils/auth'
import { constantRoutes } from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()

  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.permissionList && store.getters.permissionList.length > 0) {
        next()
      } else {
        store.dispatch('user/GetUserInfo').then(() => {
          store.dispatch('permission/GenerateRoutes').then(accessRoutes => {
            router.addRoutes(accessRoutes)
            next({ ...to, replace: true })
          })
        }).catch(() => {
          next('/login')
        })
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
