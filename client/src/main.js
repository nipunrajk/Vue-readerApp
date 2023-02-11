import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import store from './store/store.js'

import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

const app = createApp(App)
// app.config.devtools = true

app.use(store)
app.use(router)
app.use(bootstrap)
app.mount('#app')
