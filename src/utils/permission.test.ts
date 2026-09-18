import { describe, expect, it } from 'vitest'
import { checkPermission, checkRole, checkRouteAccess } from './permission'

describe('permission utils', () => {
  it('allows empty requirements', () => {
    expect(checkPermission(undefined, {})).toBe(true)
    expect(checkRole(undefined, {})).toBe(true)
  })

  it('checks wildcard and explicit permissions', () => {
    expect(checkPermission('system:user:list', { permissions: ['*'] })).toBe(true)
    expect(
      checkPermission(['table:export', 'system:user:list'], { permissions: ['table:export'] })
    ).toBe(true)
    expect(checkPermission('system:role:list', { permissions: ['table:export'] })).toBe(false)
  })

  it('checks roles', () => {
    expect(checkRole(['admin'], { roles: ['admin'] })).toBe(true)
    expect(checkRole(['admin'], { roles: ['operator'] })).toBe(false)
  })

  it('requires both route roles and permissions when both are configured', () => {
    const requirements = { roles: ['admin'], permissions: ['system:user:list'] }

    expect(
      checkRouteAccess(requirements, {
        roles: ['admin'],
        permissions: ['system:user:list']
      })
    ).toBe(true)
    expect(
      checkRouteAccess(requirements, {
        roles: ['operator'],
        permissions: ['system:user:list']
      })
    ).toBe(false)
    expect(checkRouteAccess(requirements, { roles: ['admin'], permissions: [] })).toBe(false)
  })
})
