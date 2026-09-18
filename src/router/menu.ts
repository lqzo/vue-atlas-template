import type { AppMenuItem, AppRouteRecordRaw, RouteAccessContext } from './types'
import { checkRouteAccess } from '@/utils/permission'

function joinPath(parentPath: string, childPath: string) {
  if (!childPath) return parentPath || '/'
  if (childPath.startsWith('/')) return childPath
  if (parentPath === '/') return `/${childPath}`
  return `${parentPath}/${childPath}`.replace(/\/+/g, '/')
}

function hasRouteAccess(route: AppRouteRecordRaw, access?: RouteAccessContext) {
  return checkRouteAccess(
    { roles: route.meta?.roles, permissions: route.meta?.permissions },
    access ?? {}
  )
}

function getRouteOrder(route: AppRouteRecordRaw) {
  return route.meta?.order ?? route.children?.find((child) => !child.meta?.hidden)?.meta?.order ?? 0
}

export function createMenus(
  routes: AppRouteRecordRaw[],
  parentPath = '',
  access?: RouteAccessContext
): AppMenuItem[] {
  return [...routes]
    .filter((route) => !route.meta?.hidden)
    .filter((route) => hasRouteAccess(route, access))
    .sort((a, b) => getRouteOrder(a) - getRouteOrder(b))
    .flatMap((route) => {
      const fullPath = joinPath(parentPath, route.path)
      const children = route.children ? createMenus(route.children, fullPath, access) : []

      if (!route.meta?.title) return children
      if (children.length === 1 && !route.meta.alwaysShow) return children

      return [
        {
          path: route.meta.externalLink || fullPath,
          title: route.meta.title,
          icon: route.meta.icon,
          children:
            children.length && route.meta.alwaysShow
              ? children
              : children.length > 1
                ? children
                : undefined
        }
      ]
    })
}
