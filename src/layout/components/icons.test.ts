import { describe, expect, it } from 'vitest'
import { getSvgIconName, isSvgIcon } from './icons'

describe('layout icons', () => {
  it('detects svg icon names', () => {
    expect(isSvgIcon('svg:dashboard')).toBe(true)
    expect(isSvgIcon('DataBoard')).toBe(false)
    expect(isSvgIcon()).toBe(false)
  })

  it('normalizes svg icon names', () => {
    expect(getSvgIconName('svg:table')).toBe('table')
    expect(getSvgIconName()).toBe('')
  })
})
