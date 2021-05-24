// 缓存token数据到浏览器

const tokenKey = 'ybaooo_token'

exports.getToken = () => {
  return window.sessionStorage.getItem(tokenKey)
}

exports.setToken = (token) => {
  return window.sessionStorage.setItem(tokenKey, token)
}

// 缓存用户信息到浏览器
const userInfo = 'userinfo'
exports.getUserInfo = () => {
  return JSON.parse(window.sessionStorage.getItem(userInfo))
}
exports.setUserInfo = (data) => {
  data = JSON.stringify(data)
  return window.sessionStorage.setItem(userInfo, data)
}
exports.removeStorage = () => {
  return window.sessionStorage.clear()
}

// 缓存激活菜单
exports.setActiveMenu = (arr) => {
  return window.sessionStorage.setItem('activemenu', JSON.stringify(arr))
}
exports.getActiveMenu = () => {
  return JSON.parse(window.sessionStorage.getItem('activemenu'))
}
exports.removeActiveMenu = () => {
  return window.sessionStorage.removeItem('activemenu')
}
