import { defineStore } from 'pinia'

export const useMagicStore = defineStore('useMagicStore', {
  state: () => ({
    modal: {} as Record<string, boolean>,
    keepData: {} as any,
  }),
  getters: {
    getKeepData: (state) => {
      return state.keepData
    },
  },
  actions: {
    openModal(key: string, state: boolean, keepData: object = {}) {
      this.modal[key] = state
      this.keepData = keepData
    },
  },
})
