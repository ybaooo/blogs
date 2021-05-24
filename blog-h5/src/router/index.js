import { createRouter, createWebHashHistory } from 'vue-router'
import home from './home'

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  home
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
