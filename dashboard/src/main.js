import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import '@/style/index.less'
import { components, plugins } from '@/utlis/element'

VueMarkdownEditor.use(vuepressTheme)
const app = createApp(App)
components.forEach(component => {
  app.component(component.name, component)
})

plugins.forEach(plugin => {
  app.use(plugin)
})

app.use(store)
app.use(router)
// app.use(ElementPlus)
app.use(VueMarkdownEditor)
app.mount('#app')

export default app
