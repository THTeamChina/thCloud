import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/api/members/manager/list',
    method: 'get',
    params: query
  })
}

export function getDetail(id) {
  return fetch({
    url: '/api/members/manager',
    method: 'get',
    params: { id }
  })
}

export function resetPassword(id) {
  return fetch({
    url: '/api/members/manager/resetpwd',
    method: 'post',
    params: { id }
  })
}

export function setFreeze(id) {
  return fetch({
    url: '/api/members/manager/setFreeze',
    method: 'post',
    params: { id }
  })
}

export function setUnfreeze(id) {
  return fetch({
    url: '/api/members/manager/setUnfreeze',
    method: 'post',
    params: { id }
  })
}

export function putEdit(data) {
  return fetch({
    url: '/api/members/manager',
    method: 'put',
    data: data
  })
}

export function postCreate(data) {
  return fetch({
    url: '/api/members/manager',
    method: 'post',
    data: data
  })
}
