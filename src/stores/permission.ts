import { defineStore } from 'pinia'
import { createMenus } from '@/router/menu'
import { constantRoutes } from '@/router/routes'
import type { RouteAccessContext } from '@/router/types'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    menus: createMenus(constantRoutes)
  }),
  actions: {
    generateMenus(access: RouteAccessContext) {
      this.menus = createMenus(constantRoutes, '', access)
    },
    resetMenus() {
      this.menus = createMenus(constantRoutes)
    }
  }
})
