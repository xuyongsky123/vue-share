import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import vueApi from '@/api'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: null
  },
  getters: {
    getUserInfo: function (state) {
      // if (!state.userInfo) {
      //   state.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // }
      if (!state.userInfo) {
        return '当前无用户登录信息'
      }
      return state.userInfo
    }
  },
  mutations: {
    userLogin (state, pay) {
      state.userInfo = pay
      // localStorage.setItem('userInfo', JSON.stringify(pay))
    },
    userLogout (state) {
      state.userInfo = null
      // localStorage.removeItem('userInfo')
    }
  },
  actions: {
    userLoginAsync ({commit}, pay) {
      return new Promise((resolve, reject) => {
        axios.post(vueApi['login'], pay).then((data) => {
          if (parseInt(data.data.code) !== 222) {
            reject(new Error(data.data.msg))
            // 登录出错注销当前登录所有信息
            commit('userLogout')
            return
          }
          resolve()
          commit('userLogin', Object.assign(data.data, pay))
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  modules: {
  }
})
