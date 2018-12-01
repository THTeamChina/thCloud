import fetch from '@/utils/fetch'

export function getList(id) {
  return fetch({
    url: '/api/withdraw/accounts/manager/list',
    method: 'get',
    params: { id }
  })
}

export function postCreate(data) {
  return fetch({
    url: '/api/withdraw/accounts/manager',
    method: 'post',
    data
  })
}

export function putEdit(data) {
  return fetch({
    url: '/api/withdraw/accounts/manager',
    method: 'put',
    data
  })
}

export function delAccount(id) {
  return fetch({
    url: '/api/withdraw/accounts/manager',
    method: 'delete',
    params: { id }
  })
}
