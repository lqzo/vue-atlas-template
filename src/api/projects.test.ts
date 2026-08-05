import { describe, expect, it } from 'vitest'
import { getProjectListApi } from './projects'

describe('getProjectListApi', () => {
  it('returns paginated mock projects in development', async () => {
    const result = await getProjectListApi({
      keyword: '',
      status: '',
      page: 1,
      pageSize: 2
    })

    expect(result.list).toHaveLength(2)
    expect(result.total).toBeGreaterThan(2)
  })

  it('filters mock projects by keyword and status', async () => {
    const result = await getProjectListApi({
      keyword: '校验',
      status: 'draft',
      page: 1,
      pageSize: 5
    })

    expect(result).toMatchObject({
      total: 1,
      list: [
        {
          name: '表单校验',
          status: 'draft'
        }
      ]
    })
  })
})
