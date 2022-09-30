import { useAuth } from '~/store/auth'

// export const useApie = async (route: string, method: string = "GET", body?: any, token?: string) => {
//     const baseURL = 'https://pixelyear.herokuapp.com/api/'
//     const options: RequestInit = {
//         method,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     if(token){
//         options.headers['Authorization'] = 'Bearer ' + token 
//     }
//     if(method !== "GET"){
//         options.body = (typeof body === 'object') ? JSON.stringify(body) : body
//     }
//     return await fetch(`${baseURL}${route}`, options)
// }

export const useApi = async (route: string, opts?: {
    method?: string,
    token?: boolean,
    body?: any,
    rawbody?: boolean,
    formdata?: boolean
})=>{
    const baseURL = 'https://pixelyear.herokuapp.com/api/'

    const options: RequestInit = {
        method: opts?.method || 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(opts?.token){
        options.headers['Authorization'] = 'Bearer ' + useAuth().getToken
    }
    if(opts?.body){
        options.body = (typeof opts.body === 'object' && !opts?.rawbody) ? JSON.stringify(opts.body) : opts.body 
    }
    if(opts?.formdata){
        delete options.headers['Content-Type']
        // options.headers['Content-Type'] = 'multipart/form-data'
    }

    return await fetch(`${baseURL}${route}`, options)
}