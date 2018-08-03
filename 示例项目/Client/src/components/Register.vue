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
        <el-form-item
          label="确认密码"
          prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import vueApi from '@/api'
import crypto from 'crypto'
export default {
  name: 'Register',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!(/^[a-zA-z]\w{3,15}$/.test(value))) {
        callback(new Error('用户名格式不正确！注：字母、数字、下划线组成，字母开头，4-16位！'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!(/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,}/).test(value)) {
        // (?!^\\d+$)不能全是数字
        // (?!^[a-zA-Z]+$)不能全是字母
        // (?!^[_#@]+$)不能全是符号（这里只列出了部分符号，可自己增加，有的符号可能需要转义）
        // .{6,}长度不能少于8位
        callback(new Error('密码格式不正确！注：不能全是数字，不能全是字母，不能全是符号，长度不能少于8位！'))
      } else {
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      loading: false,

      ruleForm: {
        name: '',
        password: '',
        checkPass: ''
      },
      rules: {
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          { validator: validateCheckPass, trigger: 'blur' }
        ]
      }
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
          this.$http.post(vueApi['register'], {
            userName: this.ruleForm.name,
            pwd: this.getMD5(this.ruleForm.password)
          }).then((data) => {
            this.loading = false
            if (parseInt(data.data.code) === 222) {
              data.data.msg ? this.$message.success(data.data.msg + '即将跳转登录页面！') : this.$message.success('注册成功！即将跳转登录页面！')

              let _this = this
              setTimeout(function () {
                _this.$router.push('/login')
              }, 3000)
            } else {
              data.data.msg ? this.$message.error(data.data.msg) : this.$message.error('注册失败！')
            }
          }).catch((err) => {
            this.loading = false
            this.$message.error(err)
          })
        } else {
          this.$message.error('注册信息填写验证不通过！')
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
