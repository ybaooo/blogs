<template>
  <div class="index-container">
    <!-- 头部组件 -->
    <layout-header class="layout-header" :userdata='userInfo'></layout-header>
    <div class="container">
      <!-- 侧边栏组件 -->
    <layout-aside></layout-aside>
    <!-- 内容区域组件 -->
    <router-view></router-view>
    </div>
  </div>
</template>
<script>
import layoutHeader from '@/components/layout/header'
import layoutAside from '@/components/layout/aside'
// import store from '@/store'
import { getUserInfo, removeStorage } from '@/utlis/auth'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const userData = await getUserInfo()
      this.userInfo = userData
    }
  },
  components: {
    layoutHeader,
    layoutAside
  },
  // 卸载
  unmounted () {
    removeStorage()
  }
}
</script>
<style lang="less" scoped>
.index-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container{
  display: flex;
  height: 100%;
}
.layout-header {
  display: flex;
}
</style>
