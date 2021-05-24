const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
// 注册用户处理函数
exports.regUser = (req, res) => {
  const userinfo = req.body
  if (!userinfo.phone || !userinfo.pwd) {
    return res.send({ status: false, msg: '用户名/昵称/密码不能为空' })
  }
  // 查询数据库的sql
  const sql = `select * from users where phone=?`
  // 查询数据库操作
  db.query(sql, [userinfo.phone], (err, results) => {
    // 数据库报错
    if (err) {
      return res.cc(err)
    }
    // 用户存在
    if (results.length > 0) {
      return res.cc('用户已存在！')
    }
    // TODO : 验证通过，开始注册流程
    //  对密码进行加密处理
    const password = bcrypt.hashSync(userinfo.pwd, 10)
    // 插入用户操作
    userinfo.user_avatar = JSON.stringify(userinfo.user_avatar)
    const sql1 = `insert into users (phone,pwd,email,user_avatar,name,role) values (
      '${userinfo.phone}',
      '${password}',
      '${userinfo.email}',
      '${userinfo.user_avatar}',
      '${userinfo.name}',
      ${userinfo.role}
    );`
    db.query(sql1, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) {
        return res.cc('注册失败，请稍后重试！')
      }
      res.send({ status: true, msg: '注册成功！' })
    })
    
  })
}
// 登录处理函数
exports.login = (req, res) => {
  const userinfo = req.body
  const sql = `select * from users where phone=?`
  db.query(sql, userinfo.phone, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('登录失败！')
    // 判断用户名和密码是否与数据库中储存对一致
    const comparResult = bcrypt.compareSync(userinfo.pwd, results[0].pwd)
    if (!comparResult) return res.cc('用户名或密码错误')
    // 生成token
    // 剔除数据中对密码字段
    const user = {...results[0], pwd: ''}
    // 生成token
    const tokenStr = jwt.sign(user, config.jwtSecreKey, {
      expiresIn: '10h' // token对有效期
    })
    if (results[0].user_avatar !== '') {
      results[0].user_avatar = JSON.parse(results[0].user_avatar)
    } else {
      results[0].user_avatar = []
    }
    
    res.send({
      status: true,
      msg: '登录成功',
      token: `Bearer ${tokenStr}`,
      data: {...results[0], pwd: ''}
    })
  })
}

