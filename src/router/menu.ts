import type { AppMenuItem, AppRouteRecordRaw, RouteAccessContext } from './types'

function joinPath(parentPath: string, childPath: string) {
  if (!childPath) return parentPath || '/'
  if (childPath.startsWith('/')) return childPath
  if (parentPath === '/') return `/${childPath}`
  return `${parentPath}/${childPath}`.replace(/\/+/g, '/')
}

function hasRouteAccess(route: AppRouteRecordRaw, access?: RouteAccessContext) {
  const roles = route.meta?.roles
  const permissions = route.meta?.permissions

  if (roles?.length && !roles.some((role) => access?.roles?.includes(role))) return false
  if (permissions?.length) {
    const userPermissions = access?.permissions ?? []
    if (!userPermissions.includes('*') && !permissions.some((item) => userPermissions.includes(item))) {
      return false
    }
  }

  return true
}

export function createMenus(
  routes: AppRouteRecordRaw[],
  parentPath = '',
  access?: RouteAccessContext
): AppMenuItem[] {
  return [...routes]
    .filter((route) => !route.meta?.hidden)
    .filter((route) => hasRouteAccess(route, access))
    .sort((a, b) => (a.meta?.order ?? 0) - (b.meta?.order ?? 0))
    .flatMap((route) => {
      const fullPath = joinPath(parentPath, route.path)
      const children = route.children ? createMenus(route.children, fullPath, access) : []

      if (!route.meta?.title && children.length === 1) return children
      if (!route.meta?.title) return []
      if (children.length === 1 && !route.meta.alwaysShow) return children

      return [
        {
          path: route.meta.externalLink || fullPath,
          title: route.meta.title,
          icon: route.meta.icon,
          children: children.length && route.meta.alwaysShow ? children : children.length > 1 ? children : undefined
        }
      ]
    })
}
