import type { ProjectItem, ProjectListResult, ProjectQuery } from '@/api/projects'

const projects: ProjectItem[] = [
  {
    id: 1,
    name: 'Route-driven menu',
    owner: 'Atlas Team',
    status: 'active',
    updatedAt: '2026-08-05'
  },
  {
    id: 2,
    name: 'Permission directive',
    owner: 'Frontend',
    status: 'active',
    updatedAt: '2026-08-05'
  },
  {
    id: 3,
    name: 'Request wrapper',
    owner: 'Platform',
    status: 'draft',
    updatedAt: '2026-08-05'
  },
  {
    id: 4,
    name: 'Layout shell',
    owner: 'Atlas Team',
    status: 'active',
    updatedAt: '2026-08-04'
  },
  {
    id: 5,
    name: 'Form validation',
    owner: 'Business',
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
