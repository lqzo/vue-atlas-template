import type { App, DirectiveBinding } from 'vue'
import { useUserStore } from '@/stores/user'

function hasPermission(value: string | string[]) {
  const permissions = Array.isArray(value) ? value : [value]
  const userStore = useUserStore()
  return permissions.some((permission) => userStore.permissions.includes(permission))
}

export function setupPermissionDirective(app: App) {
  app.directive('permission', {
    mounted(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
      if (!hasPermission(binding.value)) {
        el.parentElement?.removeChild(el)
      }
    }
  })
}
