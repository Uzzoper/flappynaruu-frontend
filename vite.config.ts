import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            useCredentials: true,
            devOptions: {
                enabled: true,
            },
            includeAssets: ['favicon.png'],
            manifest: {
                name: 'Flappynaruu',
                short_name: 'Flappynaruu',
                description: 'Ajude Naruu a escapar da gaiola e realizar seu sonho!',
                start_url: '/',
                display: 'standalone',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                icons: [
                    {
                        src: '/favicon.png',
                        sizes: '500x500',
                        type: 'image/png',
                    }
                ],
            },
        }),
    ],
    server: {
        proxy: {
            '/leaderboard': {
                target: 'https://flappynaruu-backend.onrender.com',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
