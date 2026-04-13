import request from '@/utils/request'
import type { ApiResponse } from '@/types'

export interface PermissionItem {
  id: string
  name: string
  code: string
  type: number
  url?: string
  parentId?: string
  sort?: number
  status: number
  createTime: string
  children?: PermissionItem[]
}

export const getPermissionTree = () =>
  request.get<any, ApiResponse<PermissionItem[]>>('/sys/permission/tree')

export const getPermissionById = (id: string) =>
  request.get<any, ApiResponse<PermissionItem>>(`/sys/permission/${id}`)

export const addPermission = (data: Partial<PermissionItem>) =>
  request.post<any, ApiResponse<void>>('/sys/permission/add', data)

export const updatePermission = (data: Partial<PermissionItem>) =>
  request.put<any, ApiResponse<void>>('/sys/permission/update', data)

export const deletePermission = (id: string) =>
  request.delete<any, ApiResponse<void>>(`/sys/permission/${id}`)
