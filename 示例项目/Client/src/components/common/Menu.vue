<template>
  <el-menu
    :sync="false"
    :default-active="activeIndex"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    @select="handleSelect">
    <el-menu-item
      v-for="(item,index) in $t('lang.menu')"
      :key="index"
      :index="item.path"
      :route="item.path">{{ item.name }}</el-menu-item>
  </el-menu>
</template>
<script>
import {getCookie} from '@/assets/tool'
export default {
  name: 'Header',
  data () {
    return {
      loginInfo: false, // 当前用户登录状态
      activeIndex: '1'
    }
  },
  mounted () {
    /* 页面挂载获取cookie，根据username的cookie控制登录相关页面元素 */
    if (getCookie('username')) {
      this.loginInfo = getCookie('username')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {

    }
  }
}
</script>
