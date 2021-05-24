const db = require('../db/index')
const bcrypt  = require('bcryptjs')
// 查询用户资料
exports.getUserInfo = (req, res) => {
  const sql = `select id, name, user_avatar, email, phone, role from users where id=?`
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取用户信息失败')
    const resData = results[0]
    if (resData.user_avatar === '') {
      resData.user_avatar = []
    } else {
      resData.user_avatar = JSON.parse(resData.user_avatar)
    }
    
    res.send({
      status: true,
      msg: '获取成功！',
      data: resData
    })
  })
}
// 修改用户资料
exports.updateUserInfo = (req, res) => {
  const sql = `update users set ? where id=?`
  // 头像改为数组类型储存
  req.body.user_avatar = JSON.stringify(req.body.user_avatar)
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('修改用户基本资料失败')
    res.send({
      status: true,
      msg: '修改用户资料成功'
    })
  })
}
// 修改密码
exports.updatePassword = (req, res) => {
  const sql = `select * from user where id=?`
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户不存在')
    // 判断旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.lodPwd, results[0].pwd)
    if (!compareResult) return res.cc('密码错误')
    // 对新密码进行加密并存入数据库
    const updatePwd = `update users set pwd=? where id=?`
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(updatePwd, [newPwd, req.user.id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新密码失败')
      res.send({
        status: true,
        msg: '更新密码成功'
      })
    })
  })
}
// 用户数据列表
exports.userList = (req, res) => {
  const sql = `select u.id,u.phone,u.email,u.user_avatar,u.create_time,u.name,roles.name as rolename from users as u inner join roles on u.role=roles.id`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    if (results.length < 1) return res.cc('没有更多了')
    results.forEach(item => {
      if (item.user_avatar !== '') {
        item.user_avatar = JSON.parse(item.user_avatar)
      } else {
        item.user_avatar = []
      }
      
    })
    res.send({
      status: true,
      data: results
    })
  })
}
// 查询角色列表
exports.getRoleList = (req, res) => {
  const sql = `select * from roles`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: true,
      data: results
    })
  })
}
