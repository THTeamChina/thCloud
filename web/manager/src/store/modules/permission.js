import fetch from '@/utils/fetch'
import { asyncRouterMap, constantRouterMap } from '@/router/index'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

import Layout from '@/views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => {
      return route.meta.role.includes(role)
    })
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {roles} = data
        let accessedRouters = [];
        //后台获取用户菜单--
        fetch({
          url: '/user/function/modules',
          method: 'post'
        }).then(response => {
          if (response.status == 200) {
            let modules = response.data.module;
            for (let i = 0; i < modules.length; i++) {
              if (modules[i].name != '首页') {
                let menu = {
                  path: modules[i].path,//'/members',
                  component: Layout,
                  meta: {title: modules[i].name},//, role: ['Administrators', 'Services', 'Rechargors']},
                  children: []
                };
                let menus = response.data.function;
                for (let j = 0; j < menus.length; j++) {
                  let code = menus[j].code;
                  let path = menus[j].path;
                  let name = menus[j].name;
                  if (path.search(modules[i].path + '/') != -1) {
                    menu.children.push(
                      {
                        path: path,
                        name: code,//'members-index',
                        component: Layout,//_import('members/index'),
                        meta: {title: name}//, role: ['Administrators']}
                      }
                    );
                  }
                }
                accessedRouters.push(menu);
              }
            }
            commit('SET_ROUTERS', accessedRouters)
            resolve()
          }
        });
        // if (roles.indexOf('admin') >= 0) {
        // accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        // commit('SET_ROUTERS', accessedRouters)
        // resolve()

      })
    }
  }
}

export default permission
