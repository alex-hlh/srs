import axios from '@/utils/request'

export function loginLogList(params) {
  return axios.get('/sys/log/login/list', { params })
}

export function operateLogList(params) {
  return axios.get('/sys/log/operate/list', { params })
}

export function serviceLogList(params) {
  return axios.get('/sys/log/service/list', { params })
}

export function logDetail(id) {
  return axios.get(`/sys/log/${id}`)
}
