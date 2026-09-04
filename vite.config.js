import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'katex-vendor': ['katex'],
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'canvas-confetti']
        }
      }
    }
  }
})
