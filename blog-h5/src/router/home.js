const home = {
  path: '/',
  name: 'layout',
  component: () => import('@/views/layout'),
  children: [
    { path: '', name: 'blogs', component: () => import('@/views/blogs') },
    { path: 'images', name: 'images', component: () => import('@/views/images') },
    { path: 'my', name: 'my', component: () => import('@/views/my') }
  ]
}

export default home
