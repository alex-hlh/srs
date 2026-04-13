import request from '@/utils/request'
import type { ApiResponse } from '@/types'

export interface DictItem {
  id: string
  dictName: string
  dictCode: string
  description?: string
  status: number
  createTime: string
}

export interface DictDataItem {
  id: string
  dictCode: string
  itemText: string
  itemValue: string
  sort?: number
  status: number
  createTime: string
}

export interface DictListParams {
  page?: number
  pageSize?: number
  dictName?: string
  dictCode?: string
  status?: number
}

export const getDictList = (params: DictListParams) =>
  request.post<any, ApiResponse<{
    records: DictItem[]
    total: number
    page: number
    pageSize: number
  }>>('/sys/dict/list', params)

export const getDictData = (dictCode: string) =>
  request.get<any, ApiResponse<DictDataItem[]>>(`/sys/dict/${dictCode}/data`)

export const addDict = (data: Partial<DictItem>) =>
  request.post<any, ApiResponse<void>>('/sys/dict/add', data)

export const updateDict = (data: Partial<DictItem>) =>
  request.put<any, ApiResponse<void>>('/sys/dict/update', data)

export const deleteDict = (id: string) =>
  request.delete<any, ApiResponse<void>>(`/sys/dict/${id}`)
