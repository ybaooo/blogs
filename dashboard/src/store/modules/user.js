// 用户的vuex数据
import { getToken, setToken, removeStorage, getUserInfo, setUserInfo } from '@/utlis/auth'
import { login } from '@/api/modules/user'

const state = {
  token: getToken(),
  userInfo: getUserInfo()
}

const mutations = {
  // token信息处理
  setToken (state, token) {
    state.token = token
  },
  removeToken (state) {
    state.token = null
  },
  // 用户信息处理
  setUserInfo (state, data) {
    state.userInfo = data
  },
  removeUserInfo (state) {
    state.userInfo = {}
  }
}

const actions = {
  // 登录
  async login (context, data) {
    const res = await login(data)
    context.commit('setToken', res.token)
    setToken(res.token)
    // 储存用户信息
    context.commit('setUserInfo', res.data)
    setUserInfo(res.data)
    return res
  },
  // 退出登录
  async logout (context) {
    await context.commit('removeToken')
    // 删除用户信息
    await context.commit('removeUserInfo')
    await removeStorage()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
