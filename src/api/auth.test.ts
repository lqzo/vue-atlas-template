import { describe, expect, it } from 'vitest'
import { AppRequestError } from '@/utils/request'
import { loginApi } from './auth'

describe('loginApi', () => {
  it('returns token for default development account', async () => {
    await expect(loginApi({ username: 'admin', password: 'atlas' })).resolves.toEqual({
      token: 'admin-atlas-token'
    })
  })

  it('rejects invalid development account', async () => {
    await expect(loginApi({ username: 'admin', password: 'wrong' })).rejects.toMatchObject({
      name: 'AppRequestError',
      status: 401,
      code: 'INVALID_CREDENTIALS'
    } satisfies Partial<AppRequestError>)
  })
})
