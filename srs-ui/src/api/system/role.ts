import request from '@/utils/request'
import type { ApiResponse } from '@/types'

export interface RoleItem {
  id: string
  name: string
  code: string
  description?: string
  status: number
  createTime: string
  permissions?: string[]
}

export interface RoleListParams {
  page?: number
  pageSize?: number
  name?: string
  code?: string
  status?: number
}

export const getRoleList = (params: RoleListParams) =>
  request.post<any, ApiResponse<{
    records: RoleItem[]
    total: number
    page: number
    pageSize: number
  }>>('/sys/role/list', params)

export const getRoleById = (id: string) =>
  request.get<any, ApiResponse<RoleItem>>(`/sys/role/${id}`)

export const addRole = (data: Partial<RoleItem>) =>
  request.post<any, ApiResponse<void>>('/sys/role/add', data)

export const updateRole = (data: Partial<RoleItem>) =>
  request.put<any, ApiResponse<void>>('/sys/role/update', data)

export const deleteRole = (id: string) =>
  request.delete<any, ApiResponse<void>>(`/sys/role/${id}`)
