export interface PermissionAccess {
  roles?: string[]
  permissions?: string[]
}

export function checkPermission(required: string | string[] | undefined, access: PermissionAccess) {
  if (!required || (Array.isArray(required) && !required.length)) return true

  const requiredPermissions = Array.isArray(required) ? required : [required]
  const permissions = access.permissions ?? []

  if (permissions.includes('*')) return true
  return requiredPermissions.some((permission) => permissions.includes(permission))
}

export function checkRole(required: string[] | undefined, access: PermissionAccess) {
  if (!required?.length) return true
  return required.some((role) => access.roles?.includes(role))
}
