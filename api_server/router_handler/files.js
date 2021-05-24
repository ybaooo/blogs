const path = require('path')
const fs = require('fs')
// 上传保存文件
exports.saveImage = (req, res) => {
  // 读取上传的图片信息
  const files = req.files
  if (!files) return res.cc('上传失败!')
  const imgArr = []
  files.forEach(item => {
    imgArr.push(item.filename)
  })
  res.send({
    status: true,
    data: imgArr,
    msg: '上传成功!'
  })
}
// 获取文件列表
exports.getImageList = (req, res) => {
  const pagenum = req.query.pagenum
  const pagesize = req.query.pagesize
  const imgPath = path.join(__dirname + '/../upload/images')
  fs.readdir(imgPath, (err, files) => {
    if (err) return res.cc(err)
    const total = files.length
    const arr = []
    // var t = (pagenum -1) * pagesize
    function f1() {
      var t = (pagenum -1) * pagesize
      add = function () {
        t += 1
      }
      function f2() {
        return t
      }
      return f2
    }
    var result = f1()
    for(var i = 0 ;i < pagesize; i++) {
      if (!files[result()]) break
      arr.push({ name: files[result()] })
      add()
    }
    res.send({
      status: true,
      data: arr,
      total: total
    })
  })
}
// 删除文件
exports.delImage = (req, res) => {
  const name = req.params.name
  const imgPath = path.join(`${__dirname}/../upload/images/${name}`)
  fs.unlinkSync(imgPath)
  res.send({
    status: true,
    msg: '删除成功'
  })
}