import type { Router } from 'vue-router'
import { appSettings } from '@/settings'
import { useUserStore } from '@/stores/user'
import { setupUnauthorizedHandler } from '@/utils/request'

export function setupAuthFailureHandler(router: Router) {
  setupUnauthorizedHandler(() => {
    const userStore = useUserStore()
    userStore.logout()

    if (router.currentRoute.value.path !== appSettings.tokenExpiredRedirect) {
      router.push({
        path: appSettings.tokenExpiredRedirect,
        query: { redirect: router.currentRoute.value.fullPath }
      })
    }
  })
}
