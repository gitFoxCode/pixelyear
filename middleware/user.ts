import { useAuth } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    if (useAuth().user !== null){
        return ;//abortNavigation()
    }
    // return navigateTo('/')
    console.log("Użytkownik nie jest zalogowany!")
    return navigateTo('/')
})