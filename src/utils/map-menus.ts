import { RouteRecordRaw, stringifyQuery } from 'vue-router'
import { Ibreadcrumb } from '@/base-ui/breadcrumb/type'
import _Breadcrumb from 'element-plus/lib/components/breadcrumb'
let firstMenu: any = null
export function mapMenusToRoutes(menus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  const AllRoutes: RouteRecordRaw[] = []
  const routerFile = require.context('../router/main', true, /\.ts/)
  routerFile.keys().forEach((value) => {
    const route = require('../router/main' + value.split('.')[1])

    AllRoutes.push(route.default)
  })
  console.log(AllRoutes)

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        if (!firstMenu) {
          firstMenu = menu
        }
        const route = AllRoutes.find((router) => router.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(menus)

  return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: Ibreadcrumb[] = []
  pathMaptoMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
export function pathMaptoMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: Ibreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenus = pathMaptoMenu(menu.children ?? [], currentPath)
      if (findMenus) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenus.name })
        return findMenus
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissionsList: string[] = []
  function _recurseGetPermissions(menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermissions(menu.children ?? [])
      } else if (menu.type === 3) {
        permissionsList.push(menu.permission)
      }
    }
  }
  _recurseGetPermissions(userMenus)
  return permissionsList
}
export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}
export { firstMenu }
