import { request } from '@/utils/request'
import { mockLogin, mockUserProfile } from '@/mock/auth'

export interface LoginParams {
  username: string
  password: string
}

export interface UserProfile {
  id: number
  name: string
  roles: string[]
  permissions: string[]
}

export async function loginApi(params: LoginParams) {
  if (import.meta.env.DEV) {
    return mockLogin(params)
  }
  return request.post('/auth/login', params) as Promise<{ token: string }>
}

export async function getProfileApi() {
  if (import.meta.env.DEV) {
    return mockUserProfile()
  }
  return request.get('/auth/profile') as Promise<UserProfile>
}
