import { describe, expect, it } from 'vitest'
import { AppRequestError, normalizeRequestError } from './request'

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

    expect(error.message).toBe('Server error')
  })
})
