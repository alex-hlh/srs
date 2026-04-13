import request from '@/utils/request'
import type { ApiResponse } from '@/types'

export interface UserItem {
  id: string
  username: string
  realName: string
  avatar?: string
  email?: string
  phone?: string
  status: number
  createTime: string
  roles?: string[]
}

export interface UserListParams {
  page?: number
  pageSize?: number
  username?: string
  realName?: string
  status?: number
}

export const getUserList = (params: UserListParams) =>
  request.post<any, ApiResponse<{
    records: UserItem[]
    total: number
    page: number
    pageSize: number
  }>>('/sys/user/list', params)

export const getUserById = (id: string) =>
  request.get<any, ApiResponse<UserItem>>(`/sys/user/${id}`)

export const addUser = (data: Partial<UserItem>) =>
  request.post<any, ApiResponse<void>>('/sys/user/add', data)

export const updateUser = (data: Partial<UserItem>) =>
  request.put<any, ApiResponse<void>>('/sys/user/update', data)

export const deleteUser = (id: string) =>
  request.delete<any, ApiResponse<void>>(`/sys/user/${id}`)

export const resetPassword = (id: string) =>
  request.post<any, ApiResponse<void>>(`/sys/user/${id}/resetPassword`)
