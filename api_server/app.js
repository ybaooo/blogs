const express = require('express')
const cors = require('cors')
const app = express()
const joi = require('@hapi/joi')
const config = require('./config')
const expressJWT = require('express-jwt')
// const fileupload = require('express-fileupload')

// 跨域
app.use(cors())
// 表单解析,只能解析 form
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// 挂载静态图片资源
app.use(express.static('upload'))
// 错误级别中间件
app.use(function (req, res, next) {
  res.cc = function (err, status = false, code = 400) {
    res.status(code).send({
      status,
      msg: err instanceof Error ? err.message : err
    })
  }
  next()
})
// 验证规则错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败', code = 401)
  // 未知错误
  res.cc(err)
})
// 身份认证的中间件
app.use(expressJWT({ secret: config.jwtSecreKey}).unless({ path: [/^\/api\/|\/images\//] }))
// 接受文件中间件
// app.use(fileupload())
// 导入路由模块
const userRouter =  require('./router/user')
const userinfoRouter = require('./router/userinfo')
const blogRouter = require('./router/blog')
const filesRouter = require('./router/files')
app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/my', blogRouter)
app.use('/my', filesRouter)

app.listen(3007, () => {
  console.log('api server running http://127.0.0.1:3007')
})
