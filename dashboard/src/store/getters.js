
// 数据的快捷访问
export default {
  token: state => state.user.token,
  userId: state => state.user.userInfo.id,
  userName: state => state.user.userInfo.name,
  userAvatar: state => state.user.userInfo.user_avatar,
  userEmail: state => state.user.userInfo.email,
  role: state => state.user.userInfo.role,
  activateMenu: state => state.home.activateMenu,
  activateMenuItem: state => state.home.activateMenuItem
}
