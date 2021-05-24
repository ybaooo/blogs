<template>
<div>
  <div class="upload-box">
    <div v-if="imgPathList.length > 0">
      <div class="img-box" v-for="(item, i) in imgPathList" :key="i">
        <i class="el-icon-delete del-img" @click="delImg(i)"></i>
        <img :src="item" alt="" class="img" @click="lookImg (i)">
      </div>
    </div>
    <div class="update-btn" @click="add">+
      <input type="file" style="display: none;" ref="update" @change="update">
    </div>
  </div>
  <!-- 大图浏览 -->
  <div v-if="imgDialog" class="big-img-box">
    <i class="close-box" @click="imgDialog = false">X</i>
    <i class="el-icon-arrow-left left-btn" @click="leftBtn" v-if="showLeftBtn"></i>
    <img :src="imgUrl[lookIndex]">
    <i class="el-icon-arrow-right right-btn" @click="rightBtn" v-if="showRightBtn"></i>
  </div>
</div>
</template>
<script>
import { saveImage } from '@/api/index'
import { baseURL } from '@/constants/index'
export default {
  props: {
    imgpath: Array
  },
  data () {
    return {
      imgDialog: false,
      lookIndex: 0,
      showLeftBtn: true,
      showRightBtn: true,
      imgPathList: []
    }
  },
  watch: {
    lookIndex: {
      handler (val) {
        if (val === 0) {
          this.showLeftBtn = false
        } else {
          this.showLeftBtn = true
        }
        if (val === this.imgPathList.length - 1) {
          this.showRightBtn = false
        } else {
          this.showRightBtn = true
        }
      }
    },
    imgpath: {
      handler (val) {
        this.imgPathList = val
      }
    }
  },
  methods: {
    add () {
      this.$refs.update.click()
    },
    async update () {
      const file = this.$refs.update.files
      // 上传图片到服务器
      const formData = new FormData()
      Object.keys(file).forEach(item => {
        formData.append('img', file[item])
      })
      const res = await saveImage(formData)
      this.$message.success(res.msg)
      res.data.forEach(item => {
        this.imgPathList.push(`${baseURL}images/${item}`)
      })
      this.send()
    },
    // 查看大图
    lookImg (i) {
      if (i === 0) { this.showLeftBtn = false }
      if (i === this.imgPathList.length - 1) { this.showRightBtn = false }
      this.imgDialog = true
      this.lookIndex = i
      this.lookImgurl = this.imgPathList[i]
    },
    leftBtn () {
      this.lookIndex = this.lookIndex - 1
    },
    rightBtn () {
      this.lookIndex = this.lookIndex + 1
    },
    // 删除图片
    delImg (i) {
      this.imgPathList.splice(i, 1)
      this.send()
    },
    send () {
      this.$emit('imgdata', this.imgPathList)
    }
  }
}
</script>

<style lang="less" scoped>
.upload-box{
  display: flex;
}
.update-btn{
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 2px solid #eee;
  position: relative;
  cursor: pointer;
  line-height: 100px;
  text-align: center;
  font-size: 60px;
  font-weight: 100;
  color: #eee;
}
.img-box{
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-right: 5px;
  position: relative;
  .img {
    display: inline-block;
    width: 100px;
    height: 100px;
    // background-color: red;
  }
  .del-img{
    width: 25px;
    height: 25px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    line-height: 25px;
    text-align: center;
    border-radius: 4px;
    position: absolute;
    right: 0;
    top: 0;
  }
}
.big-img-box {
  width: 80%;
  height: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba(0, 0, 0, 0.8);
  & img {
    max-width: 700px;
    max-height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .close-box{
    font-size: 30px;
    position: absolute;
    right: 20px;
    top: 0px;
    color: #fff;
    cursor: pointer;
  }
  .right-btn {
    position: absolute;
    font-size: 50px;
    color: #fff;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .left-btn {
    position: absolute;
    font-size: 50px;
    color: #fff;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
