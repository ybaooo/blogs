<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
    title="登录"
    left-text="返回"
    left-arrow
    class="page-nav-bar"
    @click-left="$router.go(-1)"
    />
    <!-- 登录表单 -->
    <van-form>
      <van-field
        name="用户名"
        placeholder="用户名"
        v-model="loginForm.phone"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
      <template #left-icon>
        <i class="iconfont iconshouji"></i>
      </template>
      </van-field>
      <van-field
        type="password"
        name="密码"
        placeholder="密码"
        v-model="loginForm.pwd"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
      <template #left-icon>
        <i class="iconfont iconyanzhengma"></i>
      </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button block type="primary" native-type="submit" @click="login">
        登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import store from '@/store/index'
export default {
  name: 'login',
  components: {},
  props: {},
  data () {
    return {
      loginForm: {
        phone: '18020270764',
        pwd: '123456'
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    login () {
      console.log(store.dispatch('login', this.loginForm))
    }
  }
}
</script>
<style lang="less" scoped>
.iconfont {
  font-size: 24px;
}

</style>
