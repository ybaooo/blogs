<template>
  <div class="userlist-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>博客管理</el-breadcrumb-item>
        <el-breadcrumb-item>博客列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        <el-table
        :data="userList"
        border
        >
          <el-table-column label="ID" prop="id" width="50px"></el-table-column>
          <el-table-column label="名称" prop="name" align="center"></el-table-column>
          <el-table-column label="账号" prop="phone" width="120px" align="center"></el-table-column>
          <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
          <el-table-column label="头像" width="150px">
            <template #default="scope">
              <img :src="scope.row.user_avatar[0]" alt="" class="user-avatar" v-if="scope.row.user_avatar[0]">
              <img src="@/assets/logo.png" alt="" class="user-avatar" v-else>
            </template>
          </el-table-column>
          <el-table-column label="角色" prop="rolename" width="200px" align="center"></el-table-column>
          <el-table-column label="操作" width="150px" align="center">
            <template #default="scope">
              <el-button
              type="warning"
              icon="el-icon-edit"
              @click="showEditDialogVisble(scope.row.id)"
              :disabled="role !== 1"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 添加用户 -->
      <user-dialog
      :visible="addDialogVisible"
      :reqtype="'add'"
      @close="addDialogVisibleClose"
      :roledata="roles"
      ></user-dialog>
      <!-- 修改用户 -->
      <user-dialog
      :visible="editDialogVisible"
      :reqtype="'edit'"
      @close="editDialogVisibleClose"
      :userdata="userInfo"
      :roledata="roles"
      ></user-dialog>
  </div>
</template>
<script>
import { getUserList, getUserInfo, getRoleList } from '@/api/modules/user'
import store from '@/store/index'
import userDialog from '@/components/userdialog'
export default {
  components: {
    userDialog
  },
  data () {
    return {
      userList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      userInfo: {},
      roles: [],
      role: store.getters.role
    }
  },
  mounted () {
    this.getUserList()
    this.getRoleList()
  },
  methods: {
    // 查询用户列表
    async getUserList () {
      const res = await getUserList()
      this.userList = res.data
    },
    // 修改用户弹窗
    async showEditDialogVisble (id) {
      this.editDialogVisible = true
      const res = await getUserInfo(id)
      this.userInfo = res.data
    },
    // 获取权限列表
    async getRoleList () {
      const res = await getRoleList()
      this.roles = res.data
    },
    // 对话框关闭事件
    addDialogVisibleClose () {
      this.addDialogVisible = false
      this.getUserList()
    },
    editDialogVisibleClose () {
      this.editDialogVisible = false
      this.getUserList()
    }
  }
}
</script>
<style lang="less" scoped>
.userlist-container{
  width: 100%;
  overflow: auto;
  .user-avatar{
    display: block;
    width: 80px;
    height: 80px;
    margin: auto;
  }
}
.el-card{
  height: 1000px;
  overflow: auto;
}
</style>
