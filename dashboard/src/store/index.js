import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import blogs from './modules/blogs'
import home from './modules/home'
const store = createStore({
  modules: {
    user,
    blogs,
    home
  },
  getters
})

export default store
