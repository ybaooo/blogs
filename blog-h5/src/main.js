import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.less'
import { components } from '@/utils/vant'
import 'amfe-flexible'

const app = createApp(App)
components.forEach(component => {
  app.component(component.name, component)
})

app.use(store)
app.use(router)
app.mount('#app')
