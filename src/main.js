import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { makeServer } from './server'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

makeServer({ environment: 'development' })

const vuetify = createVuetify({
  components,
  directives
})

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')
