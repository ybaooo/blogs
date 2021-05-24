<template>
  <div class="add-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/bloglist' }">博客列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加博客</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card :body-style="{ height: '1500px' }">
      <el-alert
      title="分类必填"
      type="info"
      center
      :closable='false'
      show-icon>
    </el-alert>
    <!-- 表单区域 -->
    <el-form :model="blogData" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题">
        <el-input v-model="blogData.title"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="blogData.subhead"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classify">
        <el-select v-model="blogData.classify_id" placeholder="请选择">
          <el-option
          v-for="item in blogClassify"
          :key="item.id"
          :label="item.classify_name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- markdown编辑器 -->
      <v-md-editor v-model="blogData.content" height="600px"></v-md-editor>
      <!-- 提交按钮 -->
      <el-button type="primary" @click="saveForm()">提交</el-button>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import { getBlogClassify, addBlog } from '@/api/modules/blogs'
export default {
  data () {
    return {
      blogData: {
        title: '',
        subhead: '',
        classify_id: null,
        content: ''
      },
      blogClassify: []
    }
  },
  created () {
    this.getBlogClassify()
  },
  methods: {
    // 博客分类数据
    async getBlogClassify () {
      const res = await getBlogClassify()
      this.blogClassify = res.data
      console.log(res)
    },
    // 提交
    async saveForm () {
      if (this.blogData.classify_id === null) return this.$message.error('分类必须选择！')
      const res = await addBlog(this.blogData)
      this.$message.success(res.msg)
      this.$router.push('/home/bloglist')
    }
  }
}
</script>
<style lang="less" scoped>
.add-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-input,.el-select{
    width: 500px;
  }
  .el-button {
    margin-top: 20px;
    width: 200px;
  }
  .el-card {
    height: 1200px;
    overflow: auto;
  }
  .el-alert {
    margin-bottom: 15px;
  }
}
</style>
