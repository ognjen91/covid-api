import { createApp } from 'vue'
import { store } from './store'

import router from './router'
import 'es6-promise/auto'

import App from './App.vue'

const app = createApp(App)

//using vue-router for routing
app.use(router)
app.use(store)

app.mount('#app')
