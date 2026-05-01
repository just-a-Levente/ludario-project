import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

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
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://192.168.100.1:8000', // main system's IP
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://192.168.100.1:8000', // WebSocket proxy
        ws: true,
        changeOrigin: true,
      },
    },
  },
})
