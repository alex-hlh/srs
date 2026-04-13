import React from 'react'
import { Layout, Dropdown, Avatar, Space } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store'

const { Header } = Layout

interface HeaderContentProps {
  collapsed: boolean
  onToggle: () => void
}

const HeaderContent: React.FC<HeaderContentProps> = ({ collapsed, onToggle }) => {
  const navigate = useNavigate()
  const { userInfo, logout } = useUserStore()

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logout()
      navigate('/login')
    }
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'username',
      label: userInfo?.realName || userInfo?.username || '用户',
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  return (
    <Header className="header-content">
      <div className="header-left">
        {collapsed ? (
          <MenuUnfoldOutlined className="trigger" onClick={onToggle} />
        ) : (
          <MenuFoldOutlined className="trigger" onClick={onToggle} />
        )}
      </div>
      <div className="header-right">
        <Dropdown
          menu={{ items: userMenuItems, onClick: handleMenuClick }}
          placement="bottomRight"
        >
          <Space className="user-info">
            <Avatar icon={<UserOutlined />} src={userInfo?.avatar} />
            <span className="username">{userInfo?.realName || userInfo?.username}</span>
          </Space>
        </Dropdown>
      </div>
    </Header>
  )
}

export default HeaderContent
