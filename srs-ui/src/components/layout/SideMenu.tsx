import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  ClusterOutlined,
  SafetyOutlined,
  BookOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '/dashboard',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: '/system',
    icon: <UserOutlined />,
    label: '系统管理',
    children: [
      { key: '/system/users', label: '用户管理', icon: <UserOutlined /> },
      { key: '/system/roles', label: '角色管理', icon: <TeamOutlined /> },
      { key: '/system/department', label: '部门管理', icon: <ClusterOutlined /> },
      { key: '/system/permission', label: '权限管理', icon: <SafetyOutlined /> },
      { key: '/system/dict', label: '字典管理', icon: <BookOutlined /> },
    ],
  },
]

const SideMenu: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedKeys = location.pathname

  const openKeys = items
    .filter((item) => item && 'children' in item && item.children)
    .map((item) => item!.key as string)

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKeys]}
      defaultOpenKeys={openKeys}
      items={items}
      onClick={handleClick}
    />
  )
}

export default SideMenu
