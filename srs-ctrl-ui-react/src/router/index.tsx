import { createBrowserRouter, Navigate } from 'react-router-dom'
import BasicLayout from '@/views/layout/BasicLayout'
import Login from '@/views/user/Login'
import Dashboard from '@/views/Dashboard'
import UserList from '@/views/system/users/UserList'
import RoleList from '@/views/system/roles/RoleList'
import DepartmentList from '@/views/system/department/DepartmentList'
import PermissionList from '@/views/system/permission/PermissionList'
import DictList from '@/views/system/dict/DictList'

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
      { path: 'system/users', element: <UserList /> },
      { path: 'system/roles', element: <RoleList /> },
      { path: 'system/department', element: <DepartmentList /> },
      { path: 'system/permission', element: <PermissionList /> },
      { path: 'system/dict', element: <DictList /> },
    ],
  },
])
