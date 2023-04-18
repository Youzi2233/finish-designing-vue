import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import 'normalize.css'
import '@/assets/styles/common.less'
import 'vant/lib/index.css';
import 'element-plus/dist/index.css'
import { Lazyload } from 'vant'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

const app = createApp(App)


app.use(pinia)
app.use(router)
app.use(Lazyload)
app.mount('#app')


export default pinia
