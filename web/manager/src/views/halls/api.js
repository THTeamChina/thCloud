import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/api/tradinghalls/manager/list',
    method: 'get',
    params: query
  })
}

export function postCreate(data) {
  return fetch({
    url: '/api/tradinghalls/manager',
    method: 'post',
    data: data
  })
}

export function putEdit(data) {
  return fetch({
    url: '/api/tradinghalls/manager',
    method: 'put',
    data: data
  })
}

export function postStatus(id) {
  return fetch({
    url: '/api/tradinghalls/manager/change',
    method: 'post',
    params: { id }
  })
}

export function delHall(id) {
  return fetch({
    url: '/api/tradinghalls/manager',
    method: 'delete',
    params: { id }
  })
}

export function getDetail(id) {
  return fetch({
    url: '/api/tradinghalls/manager/detail',
    method: 'get',
    params: { id }
  })
}
