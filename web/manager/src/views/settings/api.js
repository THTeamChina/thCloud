import fetch from '@/utils/fetch'

export function getBase(query) {
  return fetch({
    url: '/api/settings/base',
    method: 'get'
  })
}

export function postBase(data) {
  return fetch({
    url: '/api/settings/base',
    method: 'post',
    data
  })
}

export function getLevels(query) {
  return fetch({
    url: '/api/settings/level',
    method: 'get'
  })
}

export function postLevels(data) {
  return fetch({
    url: '/api/settings/level',
    method: 'post',
    data
  })
}

export function getTypes(query) {
  return fetch({
    url: '/api/settings/type',
    method: 'get'
  })
}

export function postTypes(data) {
  return fetch({
    url: '/api/settings/type',
    method: 'post',
    data
  })
}

export function getUpgrades(query) {
  return fetch({
    url: '/api/settings/upgrade',
    method: 'get'
  })
}

export function postUpgrades(data) {
  return fetch({
    url: '/api/settings/upgrade',
    method: 'post',
    data
  })
}

export function getRecommands(query) {
  return fetch({
    url: '/api/settings/recommands',
    method: 'get'
  })
}

export function postRecommands(data) {
  return fetch({
    url: '/api/settings/recommands',
    method: 'post',
    data
  })
}

export function getPicks(query) {
  return fetch({
    url: '/api/settings/pick',
    method: 'get'
  })
}

export function postPicks(data) {
  return fetch({
    url: '/api/settings/pick',
    method: 'post',
    data
  })
}

export function getRecharge() {
  return fetch({
    url: '/api/settings/recharge',
    method: 'get'
  })
}

export function postRecharge(data) {
  return fetch({
    url: '/api/settings/recharge',
    method: 'post',
    data
  })
}

export function getDailyList(listQuery) {
  return fetch({
    url: '/api/dailysetting/list',
    method: 'get',
    params: listQuery
  })
}

export function delDaily(id) {
  return fetch({
    url: '/api/dailysetting',
    method: 'delete',
    params: { id }
  })
}

export function postDaily(data) {
  return fetch({
    url: '/api/dailysetting',
    method: 'post',
    data
  })
}

export function queryFenHongDian() {
  return fetch({
    url: '/api/dailysetting/query',
    method: 'get'
  })
}
