<template>
  <div class="my-container">
    <div class="header">
      <!-- 未登录 -->
      <div class="login-box" @click="$router.push('/login')" v-if="!$store.getters.userInfo">
        <van-icon name="manager-o"  class="login-btn"/>
        <div>登录</div>
      </div>
      <!-- 已登录 -->
      <div class="user-box" v-else>
        <img :src="$store.getters.userAvatar" alt="" class="user-avatar">
        <span>{{$store.getters.userName}}</span>
        <van-button round>编辑资料</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/store/index'
export default {}
</script>

<style lang="less" scoped>
.my-container{
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 361px;
    background: url("~@/assets/my-bg.png") no-repeat;
    background-size: cover;
    .login-box{
      .login-btn{
      display: block;
      color: #fff;
      font-size: 120px;
      margin-bottom: 10px;
      }
      & div {
        text-align: center;
        color: #fff;
        font-size: 30px;
      }
    }
    .user-box{
      display: flex;
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      justify-content: flex-start;
      align-items: center;
      .user-avatar {
        height: 150px;
        width: 150px;
        border-radius: 50%;
        border: 1px solid #fff;
      }
      & span{
        margin-left: 15px;
        font-size: 36px;
        color: #fff;
      }
      .van-button {
        height: 40px;
      }
    }
  }
}
</style>
