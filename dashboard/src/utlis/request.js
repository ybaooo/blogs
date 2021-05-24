import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utlis/auth'
import router from '@/router/index'
import { baseURL } from '@/constants/index'

const request = axios.create({
  baseURL: baseURL,
  timeout: 15000
})
request.interceptors.request.use(request => {
  // 判断是否需要加token
  if (request.url.indexOf('my/') !== -1) {
    request.headers.Authorization = getToken()
  }
  return request
})
request.interceptors.response.use(response => {
  const { data } = response
  if (!data.status) return ElMessage.error(data.msg)
  return data
}, (err) => {
  if (err.response.status === 400) return ElMessage.error(err.response.msg)
  if (err.response.status === 401) {
    ElMessage.error('token不正确或已失效')
    return router.push('/login')
  }
})

export default request
