import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user'
import { checkPermission, checkRole } from '@/utils/permission'
import { getPageTitle } from '@/utils/title'

const whiteList = ['/login']

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)

    const userStore = useUserStore()

    if (!userStore.isLoggedIn) {
      if (whiteList.includes(to.path)) return true
      return { path: '/login', query: { redirect: to.fullPath } }
    }

    if (to.path === '/login') {
      return { path: '/' }
    }

    if (!userStore.name) {
      await userStore.loadProfile()
    }

    const roles = to.meta.roles as string[] | undefined
    if (!checkRole(roles, { roles: userStore.roles })) return { path: '/403' }

    const permissions = to.meta.permissions as string[] | undefined
    if (!checkPermission(permissions, { permissions: userStore.permissions })) {
      return { path: '/403' }
    }

    return true
  })

  router.afterEach(() => {
    NProgress.done()
  })

  router.onError(() => {
    NProgress.done()
  })
}
