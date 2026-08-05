import AdminLayout from '@/layout/AdminLayout.vue'
import type { AppRouteRecordRaw } from './types'

export const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/LoginPage.vue'),
    meta: { hidden: true, title: '登录' }
  },
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'House', order: 1 },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/DashboardPage.vue'),
        meta: {
          title: '仪表盘',
          icon: 'svg:dashboard',
          order: 1,
          affix: true
        }
      }
    ]
  },
  {
    path: '/table',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'Table',
        component: () => import('@/pages/table/TablePage.vue'),
        meta: { title: '表格', icon: 'svg:table', order: 20 }
      }
    ]
  },
  {
    path: '/form',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'Form',
        component: () => import('@/pages/form/FormPage.vue'),
        meta: { title: '表单', icon: 'svg:form', order: 30 }
      }
    ]
  },
  {
    path: '/nested',
    component: AdminLayout,
    redirect: '/nested/menu1',
    meta: { title: '嵌套菜单', icon: 'svg:nested', order: 40, alwaysShow: true },
    children: [
      {
        path: 'menu1',
        name: 'NestedMenu1',
        component: () => import('@/pages/nested/NestedMenuPage.vue'),
        meta: { title: '菜单 1' }
      },
      {
        path: 'menu2',
        meta: { title: '菜单 2', alwaysShow: true },
        children: [
          {
            path: 'level',
            name: 'NestedLevel',
            component: () => import('@/pages/nested/NestedLevelPage.vue'),
            meta: { title: '菜单 2-1' }
          }
        ]
      }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: AdminLayout,
    children: [
      {
        path: '',
        component: () => import('@/pages/profile/ProfilePage.vue'),
        meta: { title: '个人中心', hidden: true }
      }
    ]
  },
  {
    path: '/external-link',
    meta: {
      title: '外链',
      icon: 'svg:link',
      order: 50,
      externalLink: 'https://github.com/lqzo/vue-atlas-template'
    }
  },
  {
    path: '/401',
    name: 'Unauthorized',
    component: () => import('@/pages/error/UnauthorizedPage.vue'),
    meta: { hidden: true, title: '401' }
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/pages/error/ForbiddenPage.vue'),
    meta: { hidden: true, title: '403' }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/pages/error/NotFoundPage.vue'),
    meta: { hidden: true, title: '404' }
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/pages/error/ServerErrorPage.vue'),
    meta: { hidden: true, title: '500' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hidden: true }
  }
]
