import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user'
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

    const requiredPermissions = to.meta.permissions as string[] | undefined
    if (requiredPermissions?.length) {
      const allowed = requiredPermissions.some((permission) =>
        userStore.permissions.includes(permission)
      )
      if (!allowed) return { path: '/403' }
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
