import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/user/data-item-dic/query/page',
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
