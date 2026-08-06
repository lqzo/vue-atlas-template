import { effectScope, watchEffect, type App, type DirectiveBinding, type EffectScope } from 'vue'
import { useUserStore } from '@/stores/user'

type PermissionElement = HTMLElement & {
  dataset: HTMLElement['dataset'] & {
    permissionDisplay?: string
  }
  __permissionScope__?: EffectScope
}

function hasPermission(value: string | string[]) {
  const permissions = Array.isArray(value) ? value : [value]
  const userStore = useUserStore()
  return permissions.some((permission) => userStore.can(permission))
}

function updatePermissionVisibility(el: PermissionElement, value: string | string[]) {
  if (el.dataset.permissionDisplay === undefined) {
    el.dataset.permissionDisplay = el.style.display
  }

  el.style.display = hasPermission(value) ? el.dataset.permissionDisplay : 'none'
}

function setupPermissionEffect(el: PermissionElement, value: string | string[]) {
  el.__permissionScope__?.stop()
  el.__permissionScope__ = effectScope()
  el.__permissionScope__.run(() => {
    watchEffect(() => updatePermissionVisibility(el, value))
  })
}

export function setupPermissionDirective(app: App) {
  app.directive('permission', {
    mounted(el: PermissionElement, binding: DirectiveBinding<string | string[]>) {
      setupPermissionEffect(el, binding.value)
    },
    updated(el: PermissionElement, binding: DirectiveBinding<string | string[]>) {
      setupPermissionEffect(el, binding.value)
    },
    beforeUnmount(el: PermissionElement) {
      el.__permissionScope__?.stop()
    }
  })
}
