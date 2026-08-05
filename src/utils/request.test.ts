import { describe, expect, it } from 'vitest'
import {
  AppRequestError,
  handleResponseError,
  normalizeRequestError,
  setupUnauthorizedHandler
} from './request'

describe('normalizeRequestError', () => {
  it('keeps normalized request errors unchanged', () => {
    const error = new AppRequestError({ status: 403, message: 'Forbidden' })

    expect(normalizeRequestError(error)).toBe(error)
  })

  it('normalizes axios response errors', () => {
    const error = normalizeRequestError({
      isAxiosError: true,
      response: {
        status: 400,
        data: {
          code: 'INVALID_PARAMS',
          message: 'Invalid params'
        }
      }
    })

    expect(error).toMatchObject({
      name: 'AppRequestError',
      status: 400,
      code: 'INVALID_PARAMS',
      message: 'Invalid params'
    })
  })

  it('uses status message when response message is missing', () => {
    const error = normalizeRequestError({
      isAxiosError: true,
      response: {
        status: 500,
        data: {}
      }
    })

    expect(error.message).toBe('服务器错误')
  })

  it('calls unauthorized handler for 401 response errors', async () => {
    let handledStatus: number | undefined
    setupUnauthorizedHandler((error) => {
      handledStatus = error.status
    })

    const error = handleResponseError(
      {
        isAxiosError: true,
        response: {
          status: 401,
          data: {}
        }
      },
      false
    )

    expect(error).toMatchObject({
      status: 401,
      message: '登录状态已失效'
    })
    expect(handledStatus).toBe(401)
  })
})
