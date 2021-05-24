const express = require('express')

const router = express.Router()
// 表单验证中间件
const expressJoi = require('@escook/express-joi')
const { res_blog_schema } = require('../schema/blogs')

const blog_handler = require('../router_handler/blog')
// 查询博客列表
router.get('/bloglist', blog_handler.getBlogList)
// 查询博客
router.get('/blog/:id', expressJoi(res_blog_schema), blog_handler.getBlog)
// 博客分类
router.get('/blogclassify', blog_handler.getBlogClassify)
// 更新博客
router.post('/updateblog', blog_handler.updateBlog)
// 新增博客
router.post('/addblog', blog_handler.addBlog)
// 逻辑删除博客
router.delete('/delblog/:id', blog_handler.delBlog)
// 添加博客分类
router.post('/addblogclassify', blog_handler.addBlogClassify)

module.exports = router