<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

      <breadcrumb class="breadcrumb-container"></breadcrumb>

      <div class="right-menu">
        <error-log class="errLog-container right-menu-item"></error-log>

        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <label class="user-avatar">{{name}}</label>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>
                {{$t('navbar.dashboard')}}
              </el-dropdown-item>
            </router-link>

            <el-dropdown-item divided>
              <span @click="editPassword" style="display:block;">修改密码</span>
            </el-dropdown-item>

            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <EditPassword :visible="editPasswordVisible" @update:visible="val => editPasswordVisible = val" @success="logout" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import ErrorLog from '@/components/ErrorLog'
  import ThemePicker from '@/components/ThemePicker'
  import EditPassword from './EditPassword'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      ErrorLog,
      ThemePicker,
      EditPassword
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name'
      ])
    },
    data() {
      return {
        editPasswordVisible: false
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      editPassword() {
        this.editPasswordVisible = true
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index.scss';
</style>
