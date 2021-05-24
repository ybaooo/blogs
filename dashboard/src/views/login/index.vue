<template>
  <div class="login-content">
    <div class="form-box">
      <img src="@/assets/logo.png" alt="" class="head-img">
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" class="login-form">
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.pwd" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="login" v-if="isClickBtn">登录</el-button>
          <i class="el-icon-loading" v-else></i>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import { isDev } from '@/constants/index'
export default {
  data () {
    return {
      isClickBtn: true,
      loginForm: {
        phone: isDev ? '18020270764' : '',
        pwd: isDev ? '123456' : ''
      },
      loginRules: {
        phone: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {},
  methods: {
    async login () {
      this.isClickBtn = false
      const res = await store.dispatch('user/login', this.loginForm)
      if (res) this.isClickBtn = true
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.login-content{
  height: 100%;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .head-img{
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: #eee;
    border: 5px solid #fff;
    box-shadow: 0 0 10px 3px #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .form-box{
    width: 500px;
    height: 300px;
    background: #fff;
    position: relative;
    .login-form{
      padding: 0 20px;
      box-sizing: border-box;
      width: 100%;
      position: absolute;
      bottom: 0;
    }
    .login-btn{
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
