import { describe, expect, it } from 'vitest'
import { mockProjectList } from './projects'

describe('mockProjectList', () => {
  it('filters by owner keyword and paginates results', () => {
    const result = mockProjectList({
      keyword: 'atlas',
      status: '',
      page: 1,
      pageSize: 1
    })

    expect(result.total).toBe(2)
    expect(result.list).toHaveLength(1)
    expect(result.list[0].owner).toBe('Atlas 团队')
  })
})
