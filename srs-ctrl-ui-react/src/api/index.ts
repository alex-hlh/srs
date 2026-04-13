import request from '@/utils/request'
import type { LoginParams, ApiResponse } from '@/types'

export const loginApi = (data: LoginParams) =>
  request.post<any, ApiResponse<{ token: string }>>('/sys/login', data)

export const logoutApi = () => request.post('/sys/logout')

export const getUserInfoApi = () =>
  request.get<any, ApiResponse<{
    id: string
    username: string
    realName: string
    avatar?: string
    roles: string[]
    permissions: string[]
  }>>('/sys/user/getUserInfo')

export const getMenuApi = () =>
  request.get<any, ApiResponse<any[]>>('/sys/menu')
