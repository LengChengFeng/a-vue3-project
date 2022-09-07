import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
import { setupStore } from '@/store/index'
const app = createApp(App)
app.use(globalRegister)
setupStore()
app.use(store)
app.use(router)
app.mount('#app')
