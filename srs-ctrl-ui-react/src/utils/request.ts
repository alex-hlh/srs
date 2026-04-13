import axios, { AxiosError, AxiosResponse } from 'axios'
import { message } from 'antd'
import { useUserStore } from '@/store'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
})

request.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    if (data.success === false) {
      message.error(data.error || data.message || '请求失败')
      return Promise.reject(data)
    }
    return data
  },
  (error: AxiosError<{ error?: string; message?: string }>) => {
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        message.error('登录已过期，请重新登录')
        useUserStore.getState().logout()
        window.location.href = '/login'
      } else if (status === 403) {
        message.error('没有权限访问该资源')
      } else if (status === 500) {
        message.error('服务器错误，请稍后重试')
      } else {
        message.error(error.response.data?.error || error.response.data?.message || '请求失败')
      }
    } else if (error.request) {
      message.error('网络连接失败，请检查网络')
    } else {
      message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default request
