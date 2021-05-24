const express = require('express')

const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')

const expressJoi = require('@escook/express-joi')

const { update_userinfo_schema, update_password_schema } = require('../schema/user')
// 查询用户资料
router.get('/userinfo/:id', userinfo_handler.getUserInfo)
// 修改用户资料
router.post('/unerinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
// 修改密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
// 用户数据列表
router.get('/userlist', userinfo_handler.userList)
// 获取角色列表
router.get('/rolelist', userinfo_handler.getRoleList)

module.exports = router
