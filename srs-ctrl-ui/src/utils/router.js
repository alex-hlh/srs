/**
 * 将多级嵌套路由扁平化为一级路由
 */
export function flatMultiLevelRoutes(routes) {
  const result = []

  routes.forEach(route => {
    if (route.children) {
      const children = flatMultiLevelRoutes(route.children)
      children.forEach(child => {
        result.push({
          ...child,
          path: route.path + '/' + child.path
        })
      })
    } else {
      result.push(route)
    }
  })

  return result
}

/**
 * 判断是否有权限
 */
export function hasPermission(permissions, route) {
  if (route.meta && route.meta.permission) {
    return permissions.some(p => route.meta.permission.includes(p))
  }
  return true
}

/**
 * 过滤权限路由
 */
export function filterPermissionsRoutes(routes, permissions) {
  const result = []

  routes.forEach(route => {
    if (hasPermission(permissions, route)) {
      if (route.children) {
        route.children = filterPermissionsRoutes(route.children, permissions)
      }
      result.push(route)
    }
  })

  return result
}
