import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token && config.url !== '/token') {
    config.headers['innertoken'] = store.getters.token
    config.headers['token'] = store.getters.token
  }
  // 在发送请求之前,格式化参数，增加token
  let data = config.data;
  let params = new URLSearchParams()
  for (var key in config.data) {
    params.append(key, data[key])
  }
  // params.append("tokenStr", getTimes())
  config.data = params;
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      return Promise.reject('error')
    } else {
      if (response.data.error) {
        return Promise.reject(response.data)
      }
      return response
    }
  },
  error => {
    console.log(error)// for debug
    // Message({
    //  message: error,
    //  type: 'error',
    //  duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
