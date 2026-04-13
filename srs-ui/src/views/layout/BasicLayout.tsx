import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import SideMenu from '@/components/layout/SideMenu'
import HeaderContent from '@/components/layout/HeaderContent'
import { useAppStore } from '@/store'

const { Sider, Header, Content } = Layout

const BasicLayout: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useAppStore()

  return (
    <Layout className="basic-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={sidebarCollapsed}
        width={200}
        className="layout-sider"
      >
        <div className="logo">
          <span>{sidebarCollapsed ? 'SRS' : '星环空间'}</span>
        </div>
        <SideMenu />
      </Sider>
      <Layout>
        <Header className="layout-header">
          <HeaderContent collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        </Header>
        <Content className="layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
