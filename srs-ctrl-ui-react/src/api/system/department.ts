import request from '@/utils/request'
import type { ApiResponse } from '@/types'

export interface DepartmentItem {
  id: string
  name: string
  parentId?: string
  code?: string
  sort?: number
  status: number
  createTime: string
  children?: DepartmentItem[]
}

export const getDepartmentTree = () =>
  request.get<any, ApiResponse<DepartmentItem[]>>('/sys/department/tree')

export const getDepartmentById = (id: string) =>
  request.get<any, ApiResponse<DepartmentItem>>(`/sys/department/${id}`)

export const addDepartment = (data: Partial<DepartmentItem>) =>
  request.post<any, ApiResponse<void>>('/sys/department/add', data)

export const updateDepartment = (data: Partial<DepartmentItem>) =>
  request.put<any, ApiResponse<void>>('/sys/department/update', data)

export const deleteDepartment = (id: string) =>
  request.delete<any, ApiResponse<void>>(`/sys/department/${id}`)
