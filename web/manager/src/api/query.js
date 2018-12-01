import fetch from '@/utils/fetch'

export function queryMembers(key) {
  return fetch({
    url: '/api/query/members',
    method: 'get',
    params: { key }
  })
}

export function queryHall(key) {
  return fetch({
    url: '/api/query/halls',
    method: 'get',
    params: { key }
  })
}
