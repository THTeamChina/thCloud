import fetch from '@/utils/fetch'

export function getChildrens(key) {
  return fetch({
    url: '/api/members/manager/childrens',
    method: 'get',
    params: { key }
  })
}
