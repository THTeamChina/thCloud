import fetch from '@/utils/fetch'

export function mrRoport() {
  return fetch({
    url: '/api/dashboard/memberandrobots',
    method: 'get'
  })
}

export function coinRoport() {
  return fetch({
    url: '/api/dashboard/newcoins',
    method: 'get'
  })
}

export function getTotal() {
  return fetch({
    url: '/api/dashboard/total',
    method: 'get'
  })
}

export function getLineChart() {
  return fetch({
    url: '/api/dashboard/linechart',
    method: 'get'
  })
}
