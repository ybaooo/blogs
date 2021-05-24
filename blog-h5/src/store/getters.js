export default {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  userName: state => state.user.userInfo.name,
  userAvatar: state => state.user.userInfo.user_avatar[0]
}
