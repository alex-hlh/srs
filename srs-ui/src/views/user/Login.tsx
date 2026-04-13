import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { loginApi } from '@/api'
import { useUserStore } from '@/store'
import { md5 } from '@/utils/md5'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setToken, setUserInfo } = useUserStore()
  const [loading, setLoading] = useState(false)

  const from = (location.state as any)?.from?.pathname || '/dashboard'

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true)
    try {
      const res = await loginApi({
        username: values.username,
        password: md5(values.password),
      })

      if (res.success && res.data) {
        setToken(res.data.token)

        setUserInfo({
          id: '',
          username: values.username,
          realName: values.username,
          roles: [],
          permissions: [],
        })

        message.success('登录成功')
        navigate(from, { replace: true })
      }
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h1>星环空间</h1>
          <p>智能管控平台</p>
        </div>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
