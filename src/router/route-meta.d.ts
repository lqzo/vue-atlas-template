import type { AppRouteMeta } from './types'

declare module 'vue-router' {
  interface RouteMeta extends AppRouteMeta {}
}
