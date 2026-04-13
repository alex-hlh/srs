import React from 'react'
import { Card, Row, Col } from 'antd'

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Row gutter={16}>
        <Col span={6}>
          <Card title="用户总数" bordered={false}>
            <p className="stat-number">1,234</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="角色数量" bordered={false}>
            <p className="stat-number">56</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="部门数量" bordered={false}>
            <p className="stat-number">128</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="在线用户" bordered={false}>
            <p className="stat-number">42</p>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="系统概览" bordered={false}>
            <p>欢迎使用星环空间智能管控平台</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
