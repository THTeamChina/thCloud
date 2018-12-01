import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{ path: 'dashboard', name: 'dashboard', component: _import('dashboard/index'), meta: { title: '首页' } }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/members',
    component: Layout,
    meta: { title: '用户管理', role: ['Administrators', 'Services', 'Rechargors'] },
    children: [
      { path: 'index', name: 'members-index', component: _import('members/index'), meta: { role: ['Administrators'], title: '会员列表' } },
      { path: 'coins', name: 'members-coins', component: _import('coins/index'), meta: { role: ['Administrators', 'Rechargors'], title: '账户流水' } },
      { path: 'tree', name: 'members-tree', component: _import('membertree/index'), meta: { role: ['Administrators', 'Services', 'Rechargors'], title: '会员图谱' } }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    meta: { title: '财务管理', role: ['Administrators', 'Rechargors'] },
    children: [
      {
        path: 'orders', name: 'finance-orders', component: _import('productorders/index'), meta: { role: ['Administrators', 'Rechargors'], title: '订单审核' }
      },
      {
        path: 'recharges', name: 'finance-recharges', component: _import('recharges/index'), meta: { role: ['Administrators', 'Rechargors'], title: '充值审核' }
      },
      {
        path: 'withdraw', name: 'finance-withdraw', component: _import('withdraw/index'), meta: { role: ['Administrators', 'Rechargors'], title: '提现审核' }
      }
    ]
  },
  {
    path: '/tradings',
    component: Layout,
    meta: { title: '交易管理', role: ['Administrators', 'Services', 'Rechargors'] },
    children: [
      {
        path: 'halls', name: 'tradings-halls', component: _import('halls/index'), meta: { role: ['Administrators'], title: '交易大厅' }
      },
      {
        path: 'list', name: 'tradings-list', component: _import('tradingrecords/index'), meta: { role: ['Administrators', 'Services', 'Rechargors'], title: '交易记录' }
      }
    ]
  },
  {
    path: '/rankings',
    component: Layout,
    meta: { title: '系统排行', role: ['Administrators', 'Services'] },
    children: [
      {
        path: 'robots', name: 'rankings-robots', component: _import('coinrank/robot'), meta: { role: ['Administrators', 'Services'], title: '机器人排行' }
      },
      {
        path: 'games', name: 'rankings-game', component: _import('coinrank/yxb'), meta: { role: ['Administrators', 'Services'], title: '游戏币排行' }
      },
      {
        path: 'powers', name: 'rankings-powers', component: _import('coinrank/cdb'), meta: { role: ['Administrators', 'Services'], title: '充电币排行' }
      },
      {
        path: 'registers', name: 'rankings-registers', component: _import('coinrank/zcb'), meta: { role: ['Administrators', 'Services'], title: '注册币排行' }
      },
      {
        path: 'duzhongs', name: 'rankings-duzhong', component: _import('coinrank/dz'), meta: { role: ['Administrators', 'Services'], title: '杜仲排行' }
      },
      {
        path: 'gouwus', name: 'rankings-gouwus', component: _import('coinrank/gwb'), meta: { role: ['Administrators', 'Services'], title: '购物币排行' }
      },
      {
        path: 'fenhongs', name: 'rankings-fenhongs', component: _import('coinrank/fh'), meta: { role: ['Administrators', 'Services'], title: '分红排行' }
      },
      {
        path: 'fenhongdians', name: 'rankings-fenhongdians', component: _import('coinrank/fhd'), meta: { role: ['Administrators', 'Services'], title: '分红点排行' }
      },
      {
        path: 'lingdous', name: 'rankings-lingdous', component: _import('coinrank/ld'), meta: { role: ['Administrators', 'Services'], title: '灵豆排行' }
      },
      {
        path: 'jifens', name: 'rankings-jifens', component: _import('coinrank/jf'), meta: { role: ['Administrators', 'Services'], title: '锁定杜仲排行' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    meta: { title: '财务记录', role: ['Administrators', 'Rechargors'] },
    children: [
      {
        path: 'games', name: 'report-game', component: _import('coinrecord/yxb'), meta: { role: ['Administrators', 'Rechargors'], title: '游戏币' }
      },
      {
        path: 'powers', name: 'report-powers', component: _import('coinrecord/cdb'), meta: { role: ['Administrators', 'Rechargors'], title: '充电币' }
      },
      {
        path: 'registers', name: 'report-registers', component: _import('coinrecord/zcb'), meta: { role: ['Administrators', 'Rechargors'], title: '注冊币' }
      },
      {
        path: 'duzhongs', name: 'report-duzhong', component: _import('coinrecord/dz'), meta: { role: ['Administrators', 'Rechargors'], title: '杜仲' }
      },
      {
        path: 'gouwus', name: 'report-gouwus', component: _import('coinrecord/gwb'), meta: { role: ['Administrators', 'Rechargors'], title: '购物币' }
      },
      {
        path: 'fenhongs', name: 'report-fenhongs', component: _import('coinrecord/fh'), meta: { role: ['Administrators', 'Rechargors'], title: '分红' }
      },
      {
        path: 'fenhongdians', name: 'report-fenhongdians', component: _import('coinrecord/fhd'), meta: { role: ['Administrators', 'Rechargors'], title: '分红点' }
      },
      {
        path: 'lingdous', name: 'report-lingdous', component: _import('coinrecord/ld'), meta: { role: ['Administrators', 'Rechargors'], title: '灵豆' }
      },
      {
        path: 'jifen', name: 'report-jifen', component: _import('coinrecord/jf'), meta: { role: ['Administrators', 'Rechargors'], title: '锁定杜仲' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', role: ['Administrators'] },
    children: [
      {
        path: 'accounts', name: 'system-accounts', component: _import('accounts/index'), meta: { role: ['Administrators'], title: '账户管理' }
      },
      {
        path: 'products', name: 'system-products', component: _import('products/index'), meta: { role: ['Administrators'], title: '礼包管理' }
      },
      {
        path: 'robots', name: 'system-robots', component: _import('robots/index'), meta: { role: ['Administrators'], title: '机器人' }
      },
      {
        path: 'powers', name: 'system-powers', component: _import('powers/index'), meta: { role: ['Administrators'], title: '充电桩' }
      },
      {
        path: 'advertisements', name: 'system-advertisements', component: _import('advertisements/index'), meta: { role: ['Administrators'], title: '广告管理' }
      },
      {
        path: 'fenhong', name: 'system-fenhong', component: _import('commingsoon/index'), meta: { role: ['Administrators'], title: '分红' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    meta: { title: '参数设置', role: ['Administrators'] },
    children: [
      {
        path: 'base', name: 'setting-fh', component: _import('settings/base'), meta: { role: ['Administrators'], title: '基本参数设置' }
      },
      {
        path: 'upgrades', name: 'setting-upgrades', component: _import('settings/upgrade'), meta: { role: ['Administrators'], title: '升级条件设置' }
      },
      {
        path: 'picks', name: 'setting-picks', component: _import('settings/pick'), meta: { role: ['Administrators'], title: '采摘设置' }
      },
      {
        path: 'levels', name: 'setting-levels', component: _import('settings/level'), meta: { role: ['Administrators'], title: '会员级别奖励' }
      },
      {
        path: 'types', name: 'setting-types', component: _import('settings/typeb'), meta: { role: ['Administrators'], title: '会员类型奖励' }
      },
      {
        path: 'recommands', name: 'setting-recommands', component: _import('settings/recommands'), meta: { role: ['Administrators'], title: '推荐奖' }
      },
      {
        path: 'recharge', name: 'setting-recharge', component: _import('settings/recharge'), meta: { role: ['Administrators'], title: '充值设置' }
      },
      {
        path: 'daily', name: 'setting-daily', component: _import('settings/daily'), meta: { role: ['Administrators'], title: '每日分红设置' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
