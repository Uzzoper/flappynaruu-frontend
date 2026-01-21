import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/leaderboard': {
        target: 'https://flappynaruu-backend-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
