import { createApp } from 'vue'

import App from './App.vue'
import { makeServer } from './server'

import { registerPlugins } from '@/plugins'

makeServer({ environment: 'development' })

const app = createApp(App)
registerPlugins(app)
app.mount('#app')
