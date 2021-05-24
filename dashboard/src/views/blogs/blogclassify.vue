<template>
  <div class="classify-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span='3'>
          <el-button type="primary" @click="addClassifyDialog" :disabled="!isEdit">添加分类</el-button>
        </el-col>
        <el-col :span='10' v-if="!isEdit">
          <el-alert
          title="当前角色权限不足，无法添加分类"
          type="warning">
          </el-alert>
        </el-col>
      </el-row>
      <el-table
      :data="classifyList"
      stripe
      style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="classify_name" label="名称"></el-table-column>
      </el-table>
    </el-card>
     <!-- 添加分类的对话框 -->
    <el-dialog
    title="添加分类"
    v-model="dialogVisible"
    width="40%"
    >
      <span>分类名称：</span>
      <el-input v-model="classifyName"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addClassify">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getBlogClassify, addBlogClassify } from '@/api/modules/blogs'
import store from '@/store/index'
export default {
  data () {
    return {
      classifyList: [],
      dialogVisible: false,
      classifyName: '',
      isEdit: false
    }
  },
  mounted () {
    this.getClassify()
    this.getRight()
  },
  methods: {
    async getClassify () {
      const res = await getBlogClassify()
      this.classifyList = res.data
    },
    // 添加分类的按钮显示弹窗
    addClassifyDialog () {
      this.classifyName = ''
      this.dialogVisible = true
    },
    // 获取权限
    getRight () {
      if (store.getters.role === 1) {
        this.isEdit = true
      }
    },
    // 添加分类
    async addClassify () {
      if (this.classifyName === '') return this.$message.error('名称不能为空')
      const res = await addBlogClassify(this.classifyName)
      this.$message.success(res.msg)
      this.dialogVisible = false
      this.getClassify()
    }
  }
}
</script>
<style lang="less" scoped>
.classify-container{
  width: 100%;
  .el-input{
    width: 80%;
  }
}
</style>
