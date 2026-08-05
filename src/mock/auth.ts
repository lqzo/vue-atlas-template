import { AppRequestError } from '@/utils/request'
import type { LoginParams, UserProfile } from '@/api/auth'

export function mockLogin(params: LoginParams) {
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

export function mockUserProfile() {
  return {
    id: 1,
    name: 'Atlas Admin',
    roles: ['admin'],
    permissions: ['dashboard:view']
  } satisfies UserProfile
}
