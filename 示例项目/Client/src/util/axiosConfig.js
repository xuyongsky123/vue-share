import axios from 'axios'
import { Message } from 'element-ui'
import Router from '../router'
import Vuex from '../store'
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  Message.error({
    message: '请求错误：' + error.message
  })
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  let msg = error.message
  if (error.response.status === 401) {
    msg = '当前会话已过期。'
    Vuex.commit('userLogout')
    Router.push('/')
  }
  Message.error({
    message: '响应错误：' + msg
  })
  return Promise.reject(error)
})
export default axios
