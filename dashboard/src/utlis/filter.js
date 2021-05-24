// 全局过滤器
import dayjs from 'dayjs'
export function dateFormat (val) {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}
