// 公共pai
import request from '@/utlis/request'

// 上传图片
export function saveImage (data) {
  return request({
    url: 'my/upload/img',
    method: 'post',
    data
  })
}
