import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import router from './router'

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.my-app-dark',
      cssLayer: false,
    },
  },
})

const queryClient = new QueryClient()
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
