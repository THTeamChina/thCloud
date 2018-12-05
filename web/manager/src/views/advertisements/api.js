import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/api/gg/manager/list',
    method: 'get',
    params: query
  })
}

export function postCreate(data) {
  return fetch({
    url: '/api/gg/manager',
    method: 'post',
    data: data
  })
}

export function putEdit(data) {
  return fetch({
    url: '/api/gg/manager',
    method: 'put',
    data: data
  })
}

export function postEnable(id) {
  return fetch({
    url: '/api/gg/manager/visiable',
    method: 'post',
    params: { id }
  })
}

export function delAD(id) {
  return fetch({
    url: '/api/gg/manager',
    method: 'delete',
    params: { id }
  })
}
