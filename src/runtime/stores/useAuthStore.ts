import type { UserObjectResource } from '#imports'

import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false as boolean,
    user: {} as UserObjectResource,
  }),
  getters: {
    getToken(): string {
      const token = useCookie('u-token')
      return token.value as string
    },
  },
  actions: {
    getUserInformation() {
      useUFetch('user/information', { id: 'userInfo' }).then((data) => {
        this.user = data.data
        this.isLogin = true
      })
    },
    setToken(_token: string, to: string = '/') {
      const token = useCookie('u-token')
      token.value = _token
      navigateTo(to)
    },
    removeToken() {
      const token = useCookie('u-token')
      token.value = null
    },
    hasToken() {
      const token = useCookie('u-token')

      return typeof token.value !== 'undefined'
    },
  },
})
