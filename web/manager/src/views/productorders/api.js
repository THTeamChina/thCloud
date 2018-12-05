import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/api/productorders/manager/list',
    method: 'get',
    params: query
  })
}

export function postApproved(id) {
  return fetch({
    url: '/api/productorders/manager/approved',
    method: 'post',
    params: { id }
  })
}

export function postDeclined(id) {
  return fetch({
    url: '/api/productorders/manager/declined',
    method: 'post',
    params: { id }
  })
}
