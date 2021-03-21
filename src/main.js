import { createApp } from 'vue'
import router from './router'

import App from './App.vue'

const app = createApp(App)

//using vue-router for routing
app.use(router)

app.mount('#app')
