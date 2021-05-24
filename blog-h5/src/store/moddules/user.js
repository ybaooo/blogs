import { login } from '@/api/login'
import { getToken, setToken, clearStore, getUserInfo, setUserInfo } from '@/utils/store'

const state = {
  token: getToken(),
  userInfo: getUserInfo()
}

const mutations = {
  // token加入缓存以及vuex
  setToken (state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken (state) {
    state.token = null
    clearStore()
  },
  // 储存用户信息到vuex
  setUserInfo (state, data) {
    state.userInfo = data
    setUserInfo(data)
  }
}

const actions = {
  // 实现登录，并实现数据持久化
  async login (context, data) {
    const res = await login(data)
    // 储存token
    context.commit('setToken', res.token)
    // 储存用户数据
    context.commit('setUserInfo', res.data)
    return res
  }
}

export default {
  state,
  mutations,
  actions
}
