import fetch from '@/utils/fetch'

export function getRobotRank(page) {
  return fetch({
    url: '/api/rankings/robots',
    method: 'get',
    params: { page }
  })
}

export function getyxbRank(page) {
  return fetch({
    url: '/api/rankings/yxb',
    method: 'get',
    params: { page }
  })
}

export function getcdbRank(page) {
  return fetch({
    url: '/api/rankings/cdb',
    method: 'get',
    params: { page }
  })
}

export function getzcbRank(page) {
  return fetch({
    url: '/api/rankings/zcb',
    method: 'get',
    params: { page }
  })
}

export function getdzRank(page) {
  return fetch({
    url: '/api/rankings/dz',
    method: 'get',
    params: { page }
  })
}

export function getgwbRank(page) {
  return fetch({
    url: '/api/rankings/gwb',
    method: 'get',
    params: { page }
  })
}

export function getfhRank(page) {
  return fetch({
    url: '/api/rankings/fh',
    method: 'get',
    params: { page }
  })
}

export function getfhdRank(page) {
  return fetch({
    url: '/api/rankings/fhd',
    method: 'get',
    params: { page }
  })
}

export function getldRank(page) {
  return fetch({
    url: '/api/rankings/ld',
    method: 'get',
    params: { page }
  })
}

export function getjfRank(page) {
  return fetch({
    url: '/api/rankings/jf',
    method: 'get',
    params: { page }
  })
}
