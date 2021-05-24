<template>
  <el-dialog :title="titleName" v-model="dialogVisible" modal @close="dialogStatus">
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" :disabled="reqtype !== 'add'"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd" v-if="reqtype === 'add'">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role" placeholder="请选择">
          <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <p>头像</p>
        <!-- 文件上传组件占位 -->
        <update-img @imgdata="imgData" :imgpath="form.user_avatar"></update-img>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </template>
    </el-dialog>
</template>

<script>
import { regUser, putUserInfo } from '@/api/modules/user'
import { phoneCheck, emailCheck } from '@/utlis/formcheck'
import updateImg from '@/components/updateimg'
export default {
  components: {
    updateImg
  },
  props: {
    reqtype: String,
    visible: {
      type: Boolean,
      required: true
    },
    userdata: Object,
    roledata: Array
  },
  data () {
    return {
      dialogVisible: false,
      requestType: this.reqtype,
      form: {
        phone: '',
        name: '',
        email: '',
        pwd: '',
        role: null,
        user_avatar: []
      },
      roles: [],
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneCheck, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: emailCheck, trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {},
  watch: {
    visible: {
      handler (value) {
        this.dialogVisible = value
      }
    },
    userdata: {
      handler (val) {
        this.form = val
      }
    },
    roledata: {
      handler (val) {
        this.roles = val
      }
    }
  },
  computed: {
    titleName () {
      if (this.reqtype === 'add') {
        return '添加用户'
      } else {
        return '修改用户'
      }
    }
  },
  methods: {
    // 注册用户
    submit () {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) return
        if (this.reqtype === 'add') {
          const res = await regUser(this.form)
          this.$message.success(res.msg)
          this.dialogStatus()
        } else {
          const res = await putUserInfo(this.form)
          this.$message.success(res.msg)
          this.dialogStatus()
        }
      })
    },
    // 关闭事件告诉父级
    dialogStatus () {
      this.dialogVisible = false
      this.$emit('close', false)
    },
    // 拿到子组件的数据
    imgData (img) {
      this.form.user_avatar = img
    }
  }
}
</script>
<style lang="less" scoped>
.el-select {
  width: 100%;
}
</style>
