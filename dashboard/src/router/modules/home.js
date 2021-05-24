export default {
  path: '/home',
  name: 'home',
  component: () => import('@/views/home'),
  redirect: { path: '/home/welcome' },
  meta: { title: '管理中台' },
  children: [
    { path: '/home/welcome', name: 'welcome', component: () => import('@/views/welcome/index') },
    { path: '/home/bloglist', name: 'bloglist', component: () => import('@/views/blogs/bloglist') },
    { path: '/home/blogclassify', name: 'blogclassify', component: () => import('@/views/blogs/blogclassify') },
    { path: '/home/editblog', name: 'editblog', component: () => import('@/views/blogs/editblog') },
    { path: '/home/addblog', name: 'addblog', component: () => import('@/views/blogs/addblog') },
    { path: '/home/userlist', name: 'userlist', component: () => import('@/views/user/userlist') },
    { path: '/home/roles', name: 'roles', component: () => import('@/views/user/roles') },
    { path: '/home/imagelist', name: 'imagelist', component: () => import('@/views/resource/imagelist') }
  ]
}
