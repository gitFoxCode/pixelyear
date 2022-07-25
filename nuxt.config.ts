import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    css: ['@/assets/scss/reset.scss', '@/assets/scss/global.scss'],
    modules: ['nuxt-icons'],
    server: {
        port: 3000,
        host: '192.168.1.14'
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' }
            ]
        }
    }
})
