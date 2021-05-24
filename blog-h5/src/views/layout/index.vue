<template>
  <router-view></router-view>
    <van-tabbar route>
    <van-tabbar-item to="/">
    <template #icon>
      <i class="iconfont iconyuedu"></i>
    </template>
    知识库</van-tabbar-item>
    <van-tabbar-item icon="photo-o" to="/images">图库</van-tabbar-item>
    <van-tabbar-item to="/my">
    <template #icon>
      <i class="iconfont iconwode"></i>
    </template>
    我的</van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {}
</script>

<style lang="less" scoped>
.iconfont{
  font-size: 20px;
}
</style>
