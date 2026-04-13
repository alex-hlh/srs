import { useState, useCallback } from 'react'
import { message } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginApi, getUserInfoApi, getMenuApi, logoutApi } from '@/api'
import { useUserStore } from '@/store'
import { md5 } from '@/utils/md5'

export const useAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { token, userInfo, setToken, setUserInfo, setMenus, logout } = useUserStore()
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true)
    try {
      const res = await loginApi({
        username,
        password: md5(password),
      })
      if (res.success && res.data) {
        setToken(res.data.token)

        // Fetch user info after login
        const userRes = await getUserInfoApi()
        if (userRes.success && userRes.data) {
          setUserInfo(userRes.data)
        }

        // Fetch menus after login
        const menuRes = await getMenuApi()
        if (menuRes.success && menuRes.data) {
          setMenus(menuRes.data)
        }

        message.success('登录成功')
        const from = (location.state as any)?.from?.pathname || '/dashboard'
        navigate(from, { replace: true })
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      setLoading(false)
    }
  }, [navigate, location.state, setToken, setUserInfo, setMenus])

  const logoutUser = useCallback(async () => {
    try {
      await logoutApi()
    } catch (error) {
      console.error('Logout API failed:', error)
    } finally {
      logout()
      navigate('/login')
    }
  }, [logout, navigate])

  const checkAuth = useCallback(async () => {
    if (!token) {
      return false
    }
    try {
      const res = await getUserInfoApi()
      if (res.success && res.data) {
        setUserInfo(res.data)
        return true
      }
      return false
    } catch (error) {
      console.error('Check auth failed:', error)
      return false
    }
  }, [token, setUserInfo])

  return {
    token,
    userInfo,
    loading,
    login,
    logout: logoutUser,
    checkAuth,
    isAuthenticated: !!token,
  }
}
