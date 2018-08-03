// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from '@/util/axiosConfig'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueI18n)
// 全局注册axios
Vue.prototype.$http = Axios

const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    'zh-CN': require('./common/lang/zh'), // 中文语言包
    'en-US': require('./common/lang/en') // 英文语言包
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n, // 加入
  router,
  store,
  components: { App },
  template: '<App/>'
})
