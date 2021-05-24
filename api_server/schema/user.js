// 表单验证规则
const joi = require('@hapi/joi')

const phone = joi.string().min(11).max(11).pattern(/^1[\d]{10}$/).required()
const pwd = joi.string().min(3).max(20).required()
const id =joi.number().integer().min(1).required()
const name = joi.string().required()
const email = joi.string().email()
const user_avatar = joi.array().allow('')
const role = joi.number().required()
// 注册
exports.res_reguser_schema = {
  body: {
    phone,
    name,
    email,
    pwd,
    user_avatar,
    role
  }
}
// 登录
exports.res_login_schema = {
  body: {
    phone,
    pwd
  }
}
// 更新用户信息
exports.update_userinfo_schema = {
  body: {
    id,
    name,
    email,
    user_avatar,
    role
  }
}
// 更新密码
exports.update_password_schema = {
  body: {
    oldPwd: pwd,
    newPwd: joi.not(joi.ref('lodPwd')).concat(pwd)
  }
}
