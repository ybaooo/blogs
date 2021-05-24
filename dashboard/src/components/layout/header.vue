<template>
  <div
  class="header-container"
  :style="{height: boxHeight + 'px'}"
  >
    <img v-if="imgLogoSrc" :src="imgLogoSrc" alt="" class="logo-img">
    <slot></slot>
    <div class="user">
      <img :src="avatar" alt="" v-if="avatar.length !== 0">
      <img src="@/assets/logo.png" alt="" v-else>
      <span>{{name}}</span>
      <i class="el-icon-menu" @click="showMenu"></i>
      <div class="usermenu" v-if="showUsermenu">
        <div>个人中心</div>
        <div>修改密码</div>
        <div @click="logout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  props: {
    height: { type: Number, default: 66 },
    logosrc: { type: String, default: require('@/assets/logo.png') }
  },
  data () {
    return {
      boxHeight: this.height,
      imgLogoSrc: this.logosrc,
      showUsermenu: false,
      name: '',
      avatar: ''
    }
  },
  // 数据初始化
  mounted () {
    this.dataInit()
  },
  methods: {
    dataInit () {
      this.name = store.getters.userName
      this.avatar = store.getters.userAvatar
    },
    showMenu () {
      this.showUsermenu = !this.showUsermenu
    },
    async logout () {
      await store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.header-container{
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: tomato;
  position: relative;
}
.logo-img {
  margin-left: 10px;
  height: 66px;
}
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  height: 100%;
  margin-right: 50px;
  position: relative;
  color: #fff;
  & img {
    height: 80%;
    border-radius: 50%;
    background-color: #eee;
    border: 2px solid #fff;
    margin-right: 10px;
  }
  & span {
    font-size: 15px;
    width: 180px;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-icon-menu{
    font-size: 24px;
  }
  .usermenu{
    position:absolute;
    top: 100%;
    right: 0;
    color: #000;
    z-index: 99999999;
    &:before {
      content: '';
      height: 0;
      width: 0;
      border-bottom: 10px solid #fff;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      position: absolute;
      top: -10px;
      right: 0;
    }
    & div{
      box-sizing: border-box;
      padding:  5px 10px;
      background-color: #fff;
      cursor: pointer;
      &:hover{
        background-color: #eee;
      }
    }
  }
}
</style>
