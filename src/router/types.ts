import type { RouteRecordRaw } from 'vue-router'

export interface AppRouteMeta {
  title?: string
  icon?: string
  order?: number
  hidden?: boolean
  roles?: string[]
  permissions?: string[]
  keepAlive?: boolean
  affix?: boolean
  activeMenu?: string
  alwaysShow?: boolean
}

export type AppRouteRecordRaw = Omit<RouteRecordRaw, 'children' | 'meta'> & {
  meta?: AppRouteMeta
  children?: AppRouteRecordRaw[]
}

export interface AppMenuItem {
  path: string
  title: string
  icon?: string
  children?: AppMenuItem[]
}

export interface RouteAccessContext {
  roles?: string[]
  permissions?: string[]
}
