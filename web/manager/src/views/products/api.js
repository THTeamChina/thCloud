import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/api/products/manager/list',
    method: 'get',
    params: query
  })
}

export function post(data) {
  return fetch({
    url: '/api/products/manager',
    method: 'post',
    data
  })
}

export function del(id) {
  return fetch({
    url: '/api/products/manager',
    method: 'delete',
    params: { id }
  })
}
