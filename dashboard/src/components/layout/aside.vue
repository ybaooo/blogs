<template>
  <div class="aside-container">
    <!-- 欢迎页菜单 -->
    <router-link
    to="/home/welcome"
    :class="['menu', activateMenu === -1 ? 'activate' : '']"
    @click="activeMenu(-1, -1)"
    >
      <i class="el-icon-monitor"></i>
      <span class="text">welcome</span>
    </router-link>
    <!-- 一级菜单 -->
    <div v-for="(item, menuIndex) in menuList" :key="menuIndex">
      <div
      :class="['menu', menuIndex === activateMenu ? 'activate' : '']"
      @click="showChaildrenMenu(menuIndex)"
      v-if="item.role.indexOf(role) !== -1"
      >
        <i :class="item.icon"></i>
        <span class="text">{{item.name}}</span>
        <i :class="[menuIndex === activateMenu ? 'el-icon-arrow-down' : 'el-icon-arrow-right', 'icon-right']" v-if="item.children"></i>
      </div>
      <!-- 二级菜单 -->
      <div v-if="menuIndex === activateMenu && item.role.indexOf(role) !== -1" :class="['menu-list']">
        <router-link
        :class="['menu-item', activateMenuItem === itemIndex ? 'activate' : '']"
        v-for="(menu, itemIndex) in item.children"
        :key="itemIndex"
        :to="menu.path"
        @click="activeMenu(menuIndex, itemIndex)"
        >
          <i :class="menu.icon"></i>
          <span class="text">{{menu.menuName}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
import { mapGetters } from 'vuex'
import { getActiveMenu } from '@/utlis/auth'
export default {
  computed: {
    ...mapGetters(['activateMenu', 'activateMenuItem'])
  },
  mounted () {
    this.getActive()
  },
  data () {
    return {
      // 动态权限管理
      role: store.getters.role,
      menuList: [
        {
          name: '博客管理',
          icon: 'el-icon-tickets',
          activate: false,
          role: '1,2',
          children: [
            { menuName: '博客列表', path: '/home/bloglist', icon: 'el-icon-document', role: '1,2' },
            { menuName: '博客分类', path: '/home/blogclassify', icon: 'el-icon-edit-outline', role: '1,2' }
          ]
        },
        {
          name: '用户管理',
          icon: 'el-icon-user',
          activate: false,
          role: '1,2',
          children: [
            { menuName: '用户列表', path: '/home/userlist', icon: 'el-icon-mouse', role: '1,2' },
            { menuName: '角色权限', path: '/home/roles', icon: 'el-icon-rank', role: '1,2' }
          ]
        },
        {
          name: '资源管理',
          icon: 'el-icon-folder-opened',
          activate: false,
          role: '1,2',
          children: [
            { menuName: '图片列表', path: '/home/imagelist', icon: 'el-icon-folder-checked', role: '1,2' }
          ]
        }

      ]
    }
  },
  methods: {
    // 显示二级菜单
    showChaildrenMenu (i) {
      if (this.activateMenu === i) { i = -2 }
      // 同时展开功能未完成
      store.commit('home/setActiveMenu', [i, -1])
    },
    // 点击二级菜单存储激活分类
    activeMenu (meunIndex, itemIndex) {
      store.commit('home/setActiveMenu', [meunIndex, itemIndex])
    },
    // 路由刷新
    getActive () {
      const arr = getActiveMenu()
      store.commit('home/setActiveMenu', [arr[0], arr[1]])
    }
  }
}
</script>
<style lang="less" scoped>
.aside-container{
  width: 200px;
  height: 100%;
  background: tomato;
}
.menu{
  display: flex;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  text-decoration: none;
  color: #fff;
  font-size: 28px;
  line-height: 28px;
  position: relative;
  &:hover{
    background-color: salmon;
  }
  .text{
    white-space: nowrap;
    font-size: 15px;
    margin-left: 15px;
  }
  .icon-right{
    font-size: 20px;
    line-height: 28px;
    position: absolute;
    right: 10px;
  }
}
.menu-list{
  background-color: tomato;
  .menu-item{
    display: block;
    text-decoration: none;
    padding: 8px 0 8px 35px;
    box-sizing: border-box;
    color: #fff;
    &:hover{
      background-color: salmon;
    }
  }
  .text{
    font-size: 12px;
    margin-left: 15px;
    color: #fff;
  }
}
.activate{
  background-color: salmon;
}
</style>
