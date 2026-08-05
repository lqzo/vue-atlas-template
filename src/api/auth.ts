import { request } from '@/utils/request'
import { AppRequestError } from '@/utils/request'

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
    if (params.username !== 'admin' || params.password !== 'atlas') {
      throw new AppRequestError({
        status: 401,
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid username or password'
      })
    }

    return {
      token: `${params.username}-atlas-token`
    }
  }
  return request.post('/auth/login', params) as Promise<{ token: string }>
}

export async function getProfileApi() {
  if (import.meta.env.DEV) {
    return {
      id: 1,
      name: 'Atlas Admin',
      roles: ['admin'],
      permissions: ['dashboard:view']
    } satisfies UserProfile
  }
  return request.get('/auth/profile') as Promise<UserProfile>
}
