import axios from '@/utils/request'

export function dictTypeList(params) {
  return axios.get('/sys/dict/type/list', { params })
}

export function dictTypeDetail(id) {
  return axios.get(`/sys/dict/type/${id}`)
}

export function dictTypeAdd(data) {
  return axios.post('/sys/dict/type/add', data)
}

export function dictTypeEdit(data) {
  return axios.put('/sys/dict/type/edit', data)
}

export function dictTypeDelete(id) {
  return axios.delete(`/sys/dict/type/${id}`)
}

export function dictItemList(dictType) {
  return axios.get('/sys/dict/item/list', { params: { dictType } })
}

export function dictItemAdd(data) {
  return axios.post('/sys/dict/item/add', data)
}

export function dictItemEdit(data) {
  return axios.put('/sys/dict/item/edit', data)
}

export function dictItemDelete(id) {
  return axios.delete(`/sys/dict/item/${id}`)
}
