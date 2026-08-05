import { describe, expect, it } from 'vitest'
import { createMenus } from './menu'
import type { AppRouteRecordRaw } from './types'

describe('createMenus', () => {
  it('promotes the only visible child menu by default', () => {
    const routes: AppRouteRecordRaw[] = [
      {
        path: '/login',
        meta: { title: 'Login', hidden: true }
      },
      {
        path: '/',
        meta: { title: 'Home', icon: 'House' },
        children: [
          {
            path: 'dashboard',
            meta: { title: 'Dashboard', icon: 'DataBoard' }
          }
        ]
      }
    ]

    expect(createMenus(routes)).toEqual([
      {
        path: '/dashboard',
        title: 'Dashboard',
        icon: 'DataBoard',
        children: undefined
      }
    ])
  })

  it('keeps parent menu when alwaysShow is true', () => {
    const routes: AppRouteRecordRaw[] = [
      {
        path: '/',
        meta: { title: 'Home', icon: 'House', alwaysShow: true },
        children: [{ path: 'dashboard', meta: { title: 'Dashboard' } }]
      }
    ]

    expect(createMenus(routes)).toEqual([
      {
        path: '/',
        title: 'Home',
        icon: 'House',
        children: undefined
      }
    ])
  })

  it('keeps nested menu groups when multiple children are visible', () => {
    const routes: AppRouteRecordRaw[] = [
      {
        path: '/system',
        meta: { title: 'System', icon: 'Setting' },
        children: [
          { path: 'user', meta: { title: 'User' } },
          { path: 'role', meta: { title: 'Role' } }
        ]
      }
    ]

    expect(createMenus(routes)).toEqual([
      {
        path: '/system',
        title: 'System',
        icon: 'Setting',
        children: [
          { path: '/system/user', title: 'User', icon: undefined, children: undefined },
          { path: '/system/role', title: 'Role', icon: undefined, children: undefined }
        ]
      }
    ])
  })

  it('does not add trailing slashes for empty child paths', () => {
    const routes: AppRouteRecordRaw[] = [
      {
        path: '/permission',
        children: [{ path: '', meta: { title: 'Permission' } }]
      }
    ]

    expect(createMenus(routes)).toEqual([
      {
        path: '/permission',
        title: 'Permission',
        icon: undefined,
        children: undefined
      }
    ])
  })

  it('filters menus by permissions', () => {
    const routes: AppRouteRecordRaw[] = [
      { path: '/allowed', meta: { title: 'Allowed', permissions: ['allowed:view'] } },
      { path: '/blocked', meta: { title: 'Blocked', permissions: ['blocked:view'] } }
    ]

    expect(createMenus(routes, '', { permissions: ['allowed:view'] })).toEqual([
      {
        path: '/allowed',
        title: 'Allowed',
        icon: undefined,
        children: undefined
      }
    ])
  })

  it('allows wildcard permissions', () => {
    const routes: AppRouteRecordRaw[] = [
      { path: '/dashboard', meta: { title: 'Dashboard', permissions: ['dashboard:view'] } }
    ]

    expect(createMenus(routes, '', { permissions: ['*'] })).toEqual([
      {
        path: '/dashboard',
        title: 'Dashboard',
        icon: undefined,
        children: undefined
      }
    ])
  })
})
