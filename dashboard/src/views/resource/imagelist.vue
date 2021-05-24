<template>
  <div class="imagelist-contanier">
    <div>
      <el-card>
        <el-button type="primary" @click="uploadBtn">添加资源</el-button>
        <input type="file" ref="upload" style="display: none" @change="upload" multiple>
        <el-table :data="list">
          <el-table-column label="缩略图" prop="name" width="150px">
            <template #default="scope">
              <img
              :src="imgBasePath + scope.row.name"
              class="img"
              @click="showBigImage(imgBasePath + scope.row.name)"
              >
            </template>
          </el-table-column>
          <el-table-column label="文件名" prop="name"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
              size="mini"
              @click="copyPath(imgBasePath + scope.row.name)"
              >复制链接</el-button>
              <el-button type="danger" @click="delImage(scope.row.name)" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pagenum"
        :page-sizes="[6, 12, 24, 50]"
        :page-size="query.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
      </el-card>
      <!-- 图片预览弹窗 -->
      <div class="look-box" v-if="lookImgDailog">
        <i class="el-icon-close close" @click="close"></i>
        <img :src="lookPath" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { getImageList, delImage } from '@/api/modules/resource'
import { baseURL } from '@/constants/index'
import { saveImage } from '@/api/index'
export default {
  data () {
    return {
      list: [],
      imgBasePath: `${baseURL}images/`,
      lookImgDailog: false,
      lookPath: '',
      query: {
        pagenum: 1,
        pagesize: 6
      },
      total: 0
    }
  },
  mounted () {
    this.getImageList()
  },
  methods: {
    async getImageList () {
      const res = await getImageList(this.query)
      this.list = res.data
      this.total = res.total
    },
    // 查看大图
    showBigImage (path) {
      this.lookImgDailog = true
      this.lookPath = path
    },
    // 关闭弹层
    close () {
      this.lookImgDailog = false
    },
    uploadBtn () {
      this.$refs.upload.click()
    },
    // 上传
    async upload () {
      const file = this.$refs.upload.files
      const formData = new FormData()
      Object.keys(file).forEach(item => {
        formData.append('img', file[item])
      })
      const res = await saveImage(formData)
      this.$message.success(res.msg)
      this.getImageList()
    },
    // 删除
    delImage (name) {
      this.$confirm('此操作将永久删除该文件并且影响到前端使用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delImage(name)
        this.$message.success(res.msg)
        this.getImageList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页
    handleSizeChange (newSize) {
      this.query.pagesize = newSize
      this.getImageList()
    },
    handleCurrentChange (newNum) {
      this.query.pagenum = newNum
      this.getImageList()
    },
    // 复制
    copyPath (path) {
      const input = document.createElement('input')
      input.value = path
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
      this.$message.success('复制成功！')
    }
  }
}
</script>
<style lang="less" scoped>
.imagelist-contanier{
  width: 100%;
  padding: 20px;
  background-color: #eee;
  box-sizing: border-box;
  overflow: auto;
  .img{
    width: 50px;
    height: 50px;
  }
  .el-card {
    max-height: 800px;
    overflow: auto;
  }
  .look-box{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    & img {
      max-width: 800px;
      max-height: 600px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .close{
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 30px;
      color: #fff;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
}
</style>
