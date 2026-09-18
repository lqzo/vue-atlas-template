import { describe, expect, it } from 'vitest'
import { checkPermission, checkRole } from './permission'

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
})
