import { defineStore } from 'pinia'

export const useAuth = defineStore({
  id: 'auth',

  state: () => ({
    user: JSON.parse(localStorage.getItem('user'))
  }),

  getters: {
    getToken: state => state.user.token,
    getUser: state => state.user || false
  },

  actions: {
    async login(user: object) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user)) 
      return navigateTo('/daily')
    },
    logout() {
      localStorage.removeItem('user')
      this.user = null
      // navigateTo('/')
      return location.href = '/'
    }
  }
})