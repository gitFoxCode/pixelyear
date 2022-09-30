import { useAuth } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    console.log("Middleware GUEST")
})