import { createBrowserRouter, Navigate } from 'react-router-dom'
import BasicLayout from '@/views/layout/BasicLayout'
import Login from '@/views/user/Login'
import Dashboard from '@/views/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'system',
        children: [
          { path: 'users', element: <div>用户管理</div> },
          { path: 'roles', element: <div>角色管理</div> },
          { path: 'department', element: <div>部门管理</div> },
          { path: 'permission', element: <div>权限管理</div> },
          { path: 'dict', element: <div>字典管理</div> },
        ],
      },
    ],
  },
])
