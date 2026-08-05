import { request } from '@/utils/request'
import { mockProjectList } from '@/mock/projects'

export interface ProjectItem {
  id: number
  name: string
  owner: string
  status: 'active' | 'draft'
  updatedAt: string
}

export interface ProjectQuery {
  keyword?: string
  status?: ProjectItem['status'] | ''
  page: number
  pageSize: number
}

export interface ProjectListResult {
  list: ProjectItem[]
  total: number
}

export async function getProjectListApi(query: ProjectQuery) {
  if (import.meta.env.DEV) {
    return mockProjectList(query)
  }

  return request.get('/projects', { params: query }) as Promise<ProjectListResult>
}
