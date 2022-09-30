// https://v3.nuxtjs.org/api/configuration/nuxt.config
// https://github.com/kevinmarrec/nuxt-pwa-module
export default defineNuxtConfig({
    css: ['@/assets/scss/reset.scss', '@/assets/scss/global.scss'],
    modules: ['nuxt-icons'],
    buildModules: ['@pinia/nuxt'],
    ssr: false,
    server: {
        port: 3000,
        host: '192.168.1.14'
    },
    app: {
        head: {
            title: 'PixelYear | Your year - consciously',
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' }
            ]
        }
    }
})
