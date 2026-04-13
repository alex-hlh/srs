import BasicLayout from '@/views/layout/BasicLayout'

// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  {
    path: '/system',
    component: BasicLayout,
    redirect: '/system/users',
    meta: { title: '系统管理', icon: 'setting' },
    children: [
      {
        path: 'users',
        name: 'UserList',
        component: () => import('@/views/system/users/UserList'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'roles',
        name: 'RoleList',
        component: () => import('@/views/system/roles/RoleList'),
        meta: { title: '角色管理', icon: 'team' }
      },
      {
        path: 'department',
        name: 'DepartmentList',
        component: () => import('@/views/system/department/DepartmentList'),
        meta: { title: '部门管理', icon: 'cluster' }
      },
      {
        path: 'permission',
        name: 'PermissionList',
        component: () => import('@/views/system/permission/PermissionList'),
        meta: { title: '权限管理', icon: 'safety' }
      },
      {
        path: 'dict',
        name: 'DictList',
        component: () => import('@/views/system/dict/DictList'),
        meta: { title: '字典管理', icon: 'book' }
      }
    ]
  }
]
