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
            workbox: {
                globPatterns: ['**/*.{js,css,html,png,svg,ico,wav,mp3,otf}'],
                maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images-cache',
                            expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
                        }
                    },
                    {
                        urlPattern: /\.(?:wav|mp3)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'audio-cache',
                            expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 }
                        }
                    },
                    {
                        urlPattern: /\.otf$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'fonts-cache',
                            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
                        }
                    },
                    {
                        urlPattern: /\/index\.html$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'html-cache',
                            expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 }
                        }
                    }
                ]
            }
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
