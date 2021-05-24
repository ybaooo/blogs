import { createStore } from 'vuex'
import getters from './getters'
import user from './moddules/user'
export default createStore({
  modules: {
    user
  },
  getters
})
