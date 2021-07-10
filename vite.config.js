import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  
  base: '/tickets/',

  root: resolve(__dirname, 'src'),

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        ticket: resolve(__dirname, 'src/ticket/index.html'),
        sell: resolve(__dirname, 'src/sell/index.html'),
        checkin: resolve(__dirname, 'src/checkin/index.html')
      }
    }
  }
})
