const express = require('express')

const router = express.Router()

const files_handler = require('../router_handler/files')
// 上传文件配置
const multer = require('multer')
// 设置图片的储存路径
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../upload/images`)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
// 添加配置对象
const upload = multer({ storage: storage })
// 上传图片
router.post('/upload/img', upload.array('img', 20) ,files_handler.saveImage)
// 获取图片列表
router.get('/imagelist', files_handler.getImageList)
// 删除文件
router.delete('/image/:name', files_handler.delImage)

module.exports = router
