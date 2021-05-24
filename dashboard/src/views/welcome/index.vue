<template>
  <div class="welcome-container" :style="bgStyle">
    <div>
      <!-- <span>欢迎 {{name}}</span> -->
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  data () {
    return {
      name: store.getters.userName,
      bgStyle: {
        background: 'url("https://api.ybaooo.cn/images/%E5%A5%87%E5%B9%BB%E5%B0%91%E5%A5%B3%E5%A3%81%E7%BA%B8.jpg")',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      }
    }
  },
  created () {
    this.activeMenu()
  },
  methods: {
    activeMenu () {
      store.commit('home/setActiveMenu', [-1, -1])
    }
  }
}
</script>
<style lang="less" scoped>
.welcome-container{
  padding: 20px;
  width: 100%;
  // background: url('http://127.0.0.1:3007/images/1621708763819-奇幻少女壁纸.jpg') no-repeat;
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
}
</style>
