import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
    outDir: path.resolve(__dirname, '../wwwroot'),
        emptyOutDir: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    server: {
      port: 3002,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false
          // não reescreve o caminho (mantém /api)
        },
        '/ws': {  // se usares WebSocket/STOMP
          target: 'ws://localhost:3001',
          ws: true,
        }
      }
    }
})
