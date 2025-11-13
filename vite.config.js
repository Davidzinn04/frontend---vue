import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      // Redireciona chamadas para `/resources` ao json-server local em dev
      // Ajuste a porta se você rodar o backend em outra porta.
      '/resources': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/subresources': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})