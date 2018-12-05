import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/api/robots/manager/list',
    method: 'get',
    params: query
  })
}

export function postCreate(data) {
  return fetch({
    url: '/api/robots/manager',
    method: 'post',
    data: data
  })
}

export function putEdit(data) {
  return fetch({
    url: '/api/robots/manager',
    method: 'put',
    data: data
  })
}

export function postStatus(id) {
  return fetch({
    url: '/api/robots/manager/visiable',
    method: 'post',
    params: { id }
  })
}

export function delRobot(id) {
  return fetch({
    url: '/api/robots/manager',
    method: 'delete',
    params: { id }
  })
}
