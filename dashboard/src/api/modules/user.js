import request from '@/utlis/request'

export function login (data) {
  return request({
    url: 'api/login',
    method: 'post',
    data
  })
}
// 用户列表
export function getUserList () {
  return request({
    url: 'my/userlist',
    method: 'get'
  })
}
// 角色列表
export function getRoleList () {
  return request({
    url: 'my/rolelist',
    method: 'get'
  })
}
// 注册用户
export function regUser (data) {
  return request({
    url: 'api/reguser',
    method: 'post',
    data
  })
}
// 查询用户资料
export function getUserInfo (id) {
  return request({
    url: `my/userinfo/${id}`,
    method: 'get'
  })
}
// 修改用户资料的接口

export function putUserInfo (data) {
  return request({
    url: 'my/unerinfo',
    method: 'post',
    data
  })
}
