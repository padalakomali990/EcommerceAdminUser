import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://13.60.221.19:5000',
        target: 'https://kcommerce.duckdns.org/',
        // target: 'http://127.0.0.1:5000',
        // target: "http://localhost:5000",
        changeOrigin: true,
        secure: false
      }
    }
  }
})