import permission from './role'
import store from '@/store'

const install = function (Vue) {
  Vue.directive('role', permission)

  Vue.prototype.hasRole = function (permissionRoles) {
    const roles = store.getters && store.getters.roles

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  }
}

if (window.Vue) {
  window['role'] = permission
  Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission
