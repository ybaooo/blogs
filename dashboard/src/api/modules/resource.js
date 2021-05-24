import request from '@/utlis/request'
// 资源管理
// 查询资源列表
export function getImageList (data) {
  return request({
    url: 'my/imagelist',
    method: 'get',
    params: data
  })
}
// 删除文件
export function delImage (name) {
  return request({
    url: `my/image/${name}`,
    method: 'delete'
  })
}
