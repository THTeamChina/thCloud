import { login, getUserInfo } from '@/api/account'
import { getToken, setToken, removeToken } from '@/utils/auth'
var jwtDecode = require('jwt-decode')

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if(response.status==200) {
            if(!response.data.success) {
              reject(response.data.errMsg)
              return
            }
            const token = response.data.token
            if (token) {
              setToken(token)
              commit('SET_TOKEN', token)
              resolve()
            } else {
              reject('账号密码错误')
            }
          }else{
            reject(response.statusText)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.token) {

          getUserInfo().then(response => {
            if(response.status==200) {
              if(!response.data.success) {
                reject(response.data.errMsg)
                return
              }

              var data = response.data
              var roles = []
              roles = roles.concat(data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
              roles.push(data);
              commit('SET_NAME', data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
              commit('SET_ROLES', roles)
              resolve(roles)

            }else{
              reject(response.statusText)
            }
          }).catch(error => {
            reject(error)
          })
          // var data = jwtDecode(state.token)
          // var roles = []
          // roles = roles.concat(data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
          // commit('SET_NAME', data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
          // commit('SET_ROLES', roles)
          // resolve(roles)
        } else {
          reject('no token')
        }
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        commit('SET_NAME', '')
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        commit('SET_NAME', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
