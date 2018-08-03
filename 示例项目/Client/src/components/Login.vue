<template>
  <el-container>
    <el-main>
      <el-form
        v-loading="loading"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        status-icon
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="用户名"
          prop="name">
          <el-input
            v-model="ruleForm.name"
            auto-complete="off"/>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import vueApi from '@/api'
import crypto from 'crypto'
import {setCookie, getCookie} from '@/assets/tool'
export default {
  name: 'Login',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!(/^[a-zA-z]\w{3,15}$/.test(value))) {
        callback(new Error('用户名格式不正确！字母、数字、下划线组成，字母开头，4-16位！'))
      } else {
        callback()
      }
    }
    return {
      loading: false,

      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    /* 页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录 */
    if (getCookie('username')) {
      this.$router.push('/main')
    }
  },

  methods: {
    getMD5 (str) {
      var md5 = crypto.createHash('md5')
      return md5.update(str).digest('hex')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.post(vueApi['login'], {
            userName: this.ruleForm.name,
            pwd: this.getMD5(this.ruleForm.password)
          }).then((data) => {
            this.loading = false
            if (parseInt(data.data.code) === 222) {
              data.data.msg ? this.$message.success(data.data.msg) : this.$message.success('登录成功！')
              setCookie('username', this.ruleForm.name, 60 * 60)

              // 后期需要待解决登录成功都跳转首页问题
              let _this = this
              setTimeout(function () {
                _this.$router.push('/')
              }, 3000)
            } else {
              data.data.msg ? this.$message.error(data.data.msg) : this.$message.error('登录失败！')
            }
          }).catch((err) => {
            this.loading = false
            this.$message.error(err)
          })
        } else {
          this.$message.error('登录信息填写验证不通过！')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>

</style>
