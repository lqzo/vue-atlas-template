import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './auth'

type UnauthorizedHandler = (error: AppRequestError) => void

let unauthorizedHandler: UnauthorizedHandler | undefined

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
  (error) => Promise.reject(handleResponseError(error))
)

export function setupUnauthorizedHandler(handler: UnauthorizedHandler) {
  unauthorizedHandler = handler
}

export function handleResponseError(error: unknown, showMessage = true) {
  const requestError = normalizeRequestError(error)

  if (showMessage) {
    ElMessage.error(requestError.message)
  }

  if (requestError.status === 401) {
    unauthorizedHandler?.(requestError)
  }

  return requestError
}

export function normalizeRequestError(error: unknown) {
  if (error instanceof AppRequestError) return error

  if (axios.isAxiosError(error)) {
    return createErrorFromAxios(error)
  }

  if (error instanceof Error) {
    return new AppRequestError({ message: error.message || '请求失败' })
  }

  return new AppRequestError({ message: '请求失败' })
}

function createErrorFromAxios(error: AxiosError<{ code?: string | number; message?: string }>) {
  const status = error.response?.status
  const responseData = error.response?.data
  const message = responseData?.message || getStatusMessage(status) || error.message || '请求失败'

  return new AppRequestError({
    status,
    code: responseData?.code,
    message,
    data: responseData
  })
}

function getStatusMessage(status?: number) {
  const messageMap: Record<number, string> = {
    400: '请求参数错误',
    401: '登录状态已失效',
    403: '没有访问权限',
    404: '请求资源不存在',
    500: '服务器错误'
  }

  return status ? messageMap[status] : undefined
}
