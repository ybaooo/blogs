
exports.phoneCheck = (rule, val, callback) => {
  const rge = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
  if (!rge.test(val)) callback(new Error('手机号格式不正确!'))
  callback()
}
exports.emailCheck = (rule, val, callback) => {
  const rge = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (!rge.test(val)) callback(new Error('邮箱格式不正确!'))
  callback()
}
