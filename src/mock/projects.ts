import type { ProjectItem, ProjectListResult, ProjectQuery } from '@/api/projects'

const projects: ProjectItem[] = [
  {
    id: 1,
    name: '路由驱动菜单',
    owner: 'Atlas 团队',
    status: 'active',
    updatedAt: '2026-08-05'
  },
  {
    id: 2,
    name: '权限指令',
    owner: '前端团队',
    status: 'active',
    updatedAt: '2026-08-05'
  },
  {
    id: 3,
    name: '请求封装',
    owner: '平台团队',
    status: 'draft',
    updatedAt: '2026-08-05'
  },
  {
    id: 4,
    name: '布局外壳',
    owner: 'Atlas 团队',
    status: 'active',
    updatedAt: '2026-08-04'
  },
  {
    id: 5,
    name: '表单校验',
    owner: '业务团队',
    status: 'draft',
    updatedAt: '2026-08-04'
  }
]

export function mockProjectList(query: ProjectQuery): ProjectListResult {
  const keyword = query.keyword?.trim().toLowerCase()
  const filtered = projects.filter((item) => {
    const matchesKeyword = keyword
      ? item.name.toLowerCase().includes(keyword) || item.owner.toLowerCase().includes(keyword)
      : true
    const matchesStatus = query.status ? item.status === query.status : true

    return matchesKeyword && matchesStatus
  })

  const start = (query.page - 1) * query.pageSize
  const end = start + query.pageSize

  return {
    list: filtered.slice(start, end),
    total: filtered.length
  }
}
