import request from '@/utlis/request'

export function getBlogList (data) {
  return request({
    url: 'my/bloglist',
    method: 'get',
    params: data
  })
}

export function getBlog (id) {
  return request({
    url: `my/blog/${id}`,
    method: 'get'
  })
}

export function getBlogClassify () {
  return request({
    url: 'my/blogclassify',
    method: 'get'
  })
}

export function updateBlog (data) {
  return request({
    url: 'my/updateblog',
    method: 'post',
    data
  })
}

export function addBlog (data) {
  return request({
    url: 'my/addblog',
    method: 'post',
    data
  })
}

export function addBlogClassify (data) {
  return request({
    url: 'my/addblogclassify',
    method: 'post',
    data: { name: data }
  })
}
