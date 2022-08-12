export default defineNuxtRouteMiddleware((to, from) => {
    console.log("Auth middleware starts!")
    // if (to.params.id === '1') {
    //     return abortNavigation()
    // }
    // return navigateTo('/')
})