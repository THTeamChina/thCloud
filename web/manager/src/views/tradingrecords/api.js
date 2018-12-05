import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/api/trading/history/list',
    method: 'get',
    params: query
  })
}
