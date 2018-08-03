<template>
  <div>
    <h1>Hello Main！</h1>
    <section v-show="userName">
      <p>欢迎{{ userName }}</p>
      <el-button @click="getAllData">获取所有信息</el-button>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          width="180"/>
        <el-table-column
          prop="userName"
          label="姓名"
          width="180"/>
        <el-table-column
          prop="uid"
          label="密码"/>
      </el-table>
    </section>
  </div>
</template>
<script>
import vueApi from '@/api'
import {getCookie} from '@/assets/tool'
export default {
  name: 'Main',
  data () {
    return {
      userName: '',

      loading: false,
      tableData: []
    }
  },
  created () {
    this.userName = getCookie('username')
  },
  methods: {
    getAllData () {
      console.log('ttt')
      this.loading = true
      this.$http
        .get(vueApi.getUserData)
        .then((res) => {
          this.loading = false
          if (parseInt(res.status) === 200) {
            this.tableData = res.data
          }
        }).catch((err) => {
          this.loading = false
          this.$message.error(err)
        })
    }
  }
}
</script>
