import axios from 'axios'
import { baseURL } from '@/constants/index'
const request = axios.create({
  baseURL: baseURL
})
// 请求拦截器
request.interceptors.request.use(request => {
  console.log(request)
  return request
})
// 响应拦截器
request.interceptors.response.use(response => {
  const { data } = response
  return data
})

export default request
