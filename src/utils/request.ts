import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './auth'

export interface AppRequestErrorPayload {
  status?: number
  code?: string | number
  message: string
  data?: unknown
}

export class AppRequestError extends Error {
  status?: number
  code?: string | number
  data?: unknown

  constructor(payload: AppRequestErrorPayload) {
    super(payload.message)
    this.name = 'AppRequestError'
    this.status = payload.status
    this.code = payload.code
    this.data = payload.data
  }
}

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
})

request.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const requestError = normalizeRequestError(error)
    ElMessage.error(requestError.message)
    return Promise.reject(requestError)
  }
)

export function normalizeRequestError(error: unknown) {
  if (error instanceof AppRequestError) return error

  if (axios.isAxiosError(error)) {
    return createErrorFromAxios(error)
  }

  if (error instanceof Error) {
    return new AppRequestError({ message: error.message || 'Request failed' })
  }

  return new AppRequestError({ message: 'Request failed' })
}

function createErrorFromAxios(error: AxiosError<{ code?: string | number; message?: string }>) {
  const status = error.response?.status
  const responseData = error.response?.data
  const message = responseData?.message || getStatusMessage(status) || error.message || 'Request failed'

  return new AppRequestError({
    status,
    code: responseData?.code,
    message,
    data: responseData
  })
}

function getStatusMessage(status?: number) {
  const messageMap: Record<number, string> = {
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    500: 'Server error'
  }

  return status ? messageMap[status] : undefined
}
