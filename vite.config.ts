import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const fs = require('fs')

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0', // listen on all interfaces, not just localhost
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://192.168.100.2:8000',
        changeOrigin: true,
        secure: false, // allows the self-signed cert server-side
      },
    },
    https: {
      key: fs.readFileSync('./src/cert/localhost.key'),
      cert: fs.readFileSync('./src/cert/localhost.crt'),
    },
  },
})
