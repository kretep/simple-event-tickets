import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  
  base: '/tickets/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ticket: resolve(__dirname, 'ticket/index.html'),
        sell: resolve(__dirname, 'sell/index.html'),
        checkin: resolve(__dirname, 'checkin/index.html')
      }
    }
  }
})
