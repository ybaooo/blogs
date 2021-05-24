const express = require('express')

const router = express.Router()
// 导入用户路由处理函数
const user_handler = require('../router_handler/user')
// 表单验证中间件
const expressJoi = require('@escook/express-joi')
// 验证规则对象
const { res_login_schema, res_reguser_schema } = require('../schema/user')
// 注册新用户
router.post('/reguser', expressJoi(res_reguser_schema), user_handler.regUser)
// 登录
router.post('/login', expressJoi(res_login_schema), user_handler.login)

module.exports = router
