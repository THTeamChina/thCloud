import fetch from '@/utils/fetch'
const Base64 = require('js-base64').Base64

export function login(username1, password1) {
  // var code = Base64.encode(username + ':' + password)
  // console.log(code)
  return fetch({
    url: '/user/login',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: {
      username: username1,
      password: password1
    }
  })
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}

export function getList(query) {
  return fetch({
    url: '/api/accounts/manager/list',
    method: 'get',
    params: query
  })
}

export function postCreate(data) {
  return fetch({
    url: '/api/accounts/manager',
    method: 'post',
    data: data
  })
}

export function putEdit(data) {
  return fetch({
    url: '/api/accounts/manager',
    method: 'put',
    data: data
  })
}

export function delAccount(id) {
  return fetch({
    url: '/api/accounts/manager',
    method: 'delete',
    params: { id }
  })
}

export function getDashboard() {
  return fetch({
    url: '/api/accounts/manager/account',
    method: 'get'
  })
}

export function postPassword(data) {
  return fetch({
    url: '/api/accounts/manager/editpassword',
    method: 'post',
    data: data
  })
}
