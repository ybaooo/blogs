const db = require('../db/index')

// 博客列表数据请求
exports.getBlogList = (req, res) => {
  let sql = null
  let total = 0
  const query = req.query.query
  const pagesize = req.query.pagesize
  const pagenum = req.query.pagenum
  const startIndex = (pagenum - 1) * pagesize
  const endIndex= pagesize
  // 总数
  db.query('select * from blogs where blogs.is_del = 0', (err, result) => {
    total = result.length
    if (query === '') {
      sql = `select blogs.*,blogclassify.classify_name from blogs inner join blogclassify on blogs.classify_id = blogclassify.id where blogs.is_del = 0 limit ${startIndex},${endIndex}`
      db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 0) return res.cc('没有更多了！')
        res.send({
          status: true,
          data: result,
          total: total
        })
      })
    } else {
      sql = `select blogs.*,blogclassify.classify_name from blogs inner join blogclassify on blogs.classify_id = blogclassify.id  where title like '%${query}%' and blogs.is_del = 0 limit ${startIndex},${endIndex}`
      db.query(sql, (err, result) => {
        console.log(sql)
        if (err) return res.cc(err)
        if (result.length < 1) return res.cc('没有更多了！')
        total = result.length
        res.send({
          status: true,
          data: result,
          total: total
        })
      })
    }
  })
  
}
// 单条博客数据
exports.getBlog = (req, res) => {
  const id = req.params.id
  const sql = `select blogs.*,blogclassify.classify_name from blogs inner join blogclassify on blogs.classify_id = blogclassify.id where blogs.id = ${id}`
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    if (result.length < 1) return res.cc('未找到内容！')
    res.send({
      status: true,
      data: result[0]
    })
  })
}
// 查询博客分类
exports.getBlogClassify = (req, res) => {
  const sql = `select * from blogclassify`
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    if (result.length < 1) return res.cc('暂无数据！')
    res.send({
      status: true,
      data: result
    })
  })
}
// 更新博客
exports.updateBlog = (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const subhead = req.body.subhead
  const classify_id = req.body.classify_id
  const content = req.body.content
  const sql = `update blogs set title='${title}', subhead='${subhead}', classify_id=${classify_id}, content='${content}' where id=${id}`
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc('处理失败')
    res.send({
      status: true,
      msg: '修改成功'
    })
  })
}
// 新增博客
exports.addBlog = (req, res) => {
  const title = req.body.title
  const subhead = req.body.subhead
  const classify_id = req.body.classify_id
  const content = req.body.content
  const dateTime = Date.now()
  // 判断分类id必填
  if (!classify_id) return res.cc('分类ID必填')
  const sql = `insert into blogs (title,subhead,classify_id,content,create_date) values ('${title}','${subhead}',${classify_id},'${content}','${dateTime}')`
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc('添加失败')
    res.send({
      status: true,
      msg: '添加成功'
    })
  })
}
// 逻辑删除博客
exports.delBlog = (req, res) => {
  const id = req.params.id
  const sql = `update blogs set is_del=1 where id=${id}`
  db.query(sql, (err, result) => {
    if (err) return res.cc(res)
    if (result.affectedRows !== 1) return res.cc('删除失败')
    res.send({
      status: true,
      msg: '删除成功！'
    })
  })
}
// 添加博客分类
exports.addBlogClassify = (req, res) => {
  if (req.user.roles == 1) return res.cc('权限不足')
  const name = req.body.name
  const sql = `insert into blogclassify (classify_name) values ('${name}')`
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc('添加失败！')
    res.send({
      status: true,
      msg: "添加成功"
    })
  })
}