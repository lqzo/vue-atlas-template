import AdminLayout from '@/layout/AdminLayout.vue'
import type { AppRouteRecordRaw } from './types'

export const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/LoginPage.vue'),
    meta: { hidden: true, title: 'Login' }
  },
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard',
    meta: { title: 'Home', icon: 'House', order: 1 },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/DashboardPage.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'DataBoard',
          affix: true,
          permissions: ['dashboard:view']
        }
      }
    ]
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
