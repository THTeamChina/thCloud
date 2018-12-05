import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/api/coins/manager/list',
    method: 'get',
    params: query
  })
}
