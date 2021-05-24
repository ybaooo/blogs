<template>
  <div class="bloglist-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
      <el-breadcrumb-item>博客列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索添加区域 -->
      <el-row :gutter='30'>
        <el-col :span='10'>
          <el-input v-model="blogQuery.query">
             <template #append>
               <el-button icon="el-icon-search" @click="getBlogList"></el-button>
             </template>
          </el-input>
        </el-col>
        <el-col :span='3'>
          <el-button type="primary" @click="addBlog">添加博客</el-button>
        </el-col>
      </el-row>
      <!-- 列表区域 -->
      <el-table
      border
      stripe
      style="width: 100%"
      :data='blogList'
      >
        <el-table-column label='ID' width='50px' prop="id"></el-table-column>
        <el-table-column label='标题' prop="title"></el-table-column>
        <el-table-column label='分类' prop="classify_name" width="200px"></el-table-column>
        <el-table-column label='点赞' prop="praise" width="100px"></el-table-column>
        <el-table-column label='浏览' prop="browse" width="100px"></el-table-column>
        <el-table-column label='创建时间' prop="create_date" width="200px"></el-table-column>
        <el-table-column label='操作'>
            <template #default="slotProp">
              <el-button @click="editBlog(slotProp.row.id)" icon="el-icon-edit" type="primary">编辑</el-button>
              <el-button @click="delBlog" icon="el-icon-delete" type="danger">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="blogQuery.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="blogQuery.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
// import store from '@/store/index'
import { getBlogList } from '@/api/modules/blogs'
import { dateFormat } from '@/utlis/filter'
export default {
  data () {
    return {
      blogList: [],
      blogQuery: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  created () {
    this.getBlogList()
  },
  methods: {
    async getBlogList () {
      const res = await getBlogList(this.blogQuery)
      this.total = res.total
      res.data.forEach(item => {
        item.create_date = dateFormat(item.create_date)
      })
      this.blogList = res.data
    },
    // 每页条数发生变化
    handleSizeChange (newSize) {
      this.blogQuery.pagesize = newSize
      this.getBlogList()
    },
    // 翻页
    handleCurrentChange (newNum) {
      this.blogQuery.pagenum = newNum
      this.getBlogList()
    },
    // 点击进入编辑页并传递参数
    editBlog (id) {
      this.$router.push({ name: 'editblog', query: { id: id } })
    },
    // 添加
    addBlog () {
      this.$router.push('/home/addblog')
    },
    // 删除博客
    delBlog () {
      this.$confirm('没事闲的? 去数据库删！！！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '没有删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.bloglist-container{
  width: 100%;
}
</style>
