import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/api/articles/list',
    method: 'get',
    params: query
  })
}

export function delArticle(id) {
  return fetch({
    url: '/api/articles',
    method: 'delete',
    params: {
      id
    }
  })
}

export function getDetail(id) {
  return fetch({
    url: '/api/articles',
    method: 'get',
    params: {
      id
    }
  })
}

export function postCreate(data) {
  return fetch({
    url: '/api/articles',
    method: 'post',
    data: data
  })
}
