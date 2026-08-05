// @vitest-environment jsdom

import { createApp, nextTick, reactive } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { setupPermissionDirective } from './permission'

const userState = reactive({
  permissions: [] as string[],
  can: (permission: string) =>
    userState.permissions.includes('*') || userState.permissions.includes(permission)
})

vi.mock('@/stores/user', () => ({
  useUserStore: () => userState
}))

describe('v-permission', () => {
  it('updates visibility when permissions change', async () => {
    const root = document.createElement('div')
    const app = createApp({
      template: '<button id="target" v-permission="\'system:user:list\'">用户管理动作</button>'
    })

    setupPermissionDirective(app)

    userState.permissions = []
    app.mount(root)

    const target = root.querySelector<HTMLElement>('#target')
    expect(target?.style.display).toBe('none')

    userState.permissions = ['system:user:list']
    await nextTick()

    expect(target?.style.display).toBe('')
    app.unmount()
  })

  it('allows wildcard permissions', async () => {
    const root = document.createElement('div')
    const app = createApp({
      template: '<button id="target" v-permission="\'system:user:list\'">用户管理动作</button>'
    })

    setupPermissionDirective(app)
    userState.permissions = ['*']
    app.mount(root)

    const target = root.querySelector<HTMLElement>('#target')
    expect(target?.style.display).toBe('')
    app.unmount()
  })
})
