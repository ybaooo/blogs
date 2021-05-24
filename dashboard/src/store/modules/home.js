import { setActiveMenu } from '@/utlis/auth'
const state = {
  activateMenu: -1,
  activateMenuItem: -1
}
const mutations = {
  // 设置激活分类
  setActiveMenu (state, arr) {
    setActiveMenu(arr)
    state.activateMenu = arr[0]
    state.activateMenuItem = arr[1]
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
