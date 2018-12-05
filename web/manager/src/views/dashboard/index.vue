<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import AdminDashboard from './roles/admin'
  import ManagerDashboard from './roles/manager'
  import MemberDashboard from './roles/member'

  export default {
    name: 'dashboard',
    components: { AdminDashboard, ManagerDashboard, MemberDashboard },
    data() {
      return {
        currentRole: 'AdminDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      console.log(this.roles)
      if (this.roles.indexOf('Members') >= 0) {
        this.currentRole = 'MemberDashboard'
      } else if (this.roles.indexOf('Managers') >= 0) {
        this.currentRole = 'ManagerDashboard'
      } else if (this.roles.indexOf('Administrators') >= 0) {
        this.currentRole = 'AdminDashboard'
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import './index.scss';
  .dashboard-container {
    background: #fbfbfb
  }
</style>
