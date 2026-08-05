import { describe, expect, it } from 'vitest'
import { getAppTitle, getPageTitle } from './title'

describe('title utils', () => {
  it('returns configured app title', () => {
    expect(getAppTitle()).toBe('Vue Atlas Template')
  })

  it('builds page title with app title suffix', () => {
    expect(getPageTitle('Dashboard')).toBe('Dashboard - Vue Atlas Template')
  })

  it('returns app title when page title is empty', () => {
    expect(getPageTitle()).toBe('Vue Atlas Template')
  })
})
