import fetch from '@/utils/fetch'

export function postRecharge(data) {
  return fetch({
    url: '/api/coins/manager/recharge',
    method: 'post',
    data: data
  })
}
