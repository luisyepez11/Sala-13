// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://sala-13-production.up.railway.app',
        changeOrigin: true,
        secure: false,
        // Asegúrate de que la ruta se mantenga intacta
        rewrite: (path) => path
      }
    }
  }
})