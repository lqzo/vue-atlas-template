import { defineStore } from 'pinia'
import { getProfileApi, loginApi, type LoginParams } from '@/api/auth'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { usePermissionStore } from './permission'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken() || '',
    name: '',
    roles: [] as string[],
    permissions: [] as string[]
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.token)
  },
  actions: {
    async login(params: LoginParams) {
      const { token } = await loginApi(params)
      this.token = token
      setToken(token)
    },
    async loadProfile() {
      const profile = await getProfileApi()
      this.name = profile.name
      this.roles = profile.roles
      this.permissions = profile.permissions
      const permissionStore = usePermissionStore()
      permissionStore.generateMenus({
        roles: this.roles,
        permissions: this.permissions
      })
    },
    logout() {
      const permissionStore = usePermissionStore()
      this.token = ''
      this.name = ''
      this.roles = []
      this.permissions = []
      removeToken()
      permissionStore.resetMenus()
    }
  }
})
