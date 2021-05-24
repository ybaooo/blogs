// 处理store缓存
const tokenKey = 'ybaooo_token'

exports.setToken = (token) => {
  return window.sessionStorage.setItem(tokenKey, token)
}
exports.getToken = () => {
  return window.sessionStorage.getItem(tokenKey)
}
exports.clearStore = () => {
  return window.sessionStorage.clear()
}

const userInfoKey = 'user_info'

exports.setUserInfo = (data) => {
  data = JSON.stringify(data)
  return window.sessionStorage.setItem(userInfoKey, data)
}
exports.getUserInfo = () => {
  return JSON.parse(window.sessionStorage.getItem(userInfoKey))
}
