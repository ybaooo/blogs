import { createRouter, createWebHashHistory } from 'vue-router'
import loginRouter from './modules/login'
import homeRouter from './modules/home'
import store from '@/store'

const defaultRouter = [
  {
    path: '/',
    name: 'index',
    redirect: { path: '/home' }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404')
  }
]

// 静态路由规则
const staticRouter = [
  loginRouter,
  homeRouter
]

// 动态路由规则
const asyncRouter = []

const routes = [...staticRouter, ...asyncRouter, ...defaultRouter]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 路由白名单
const whiteList = ['/login', '/404']
// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断访问的是否生路由白名单
  if (whiteList.indexOf(to.path) > -1) return next()
  // 判断是否有token
  if (!store.getters.token) return next('/login')
  next()
})
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // next()
})
export default router
