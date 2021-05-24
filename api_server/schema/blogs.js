// 表单验证规则
const joi = require('@hapi/joi')

const id =joi.number().integer().min(1).required()

exports.res_blog_schema = {
  params: {
    id
  }
}