<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="slidebar-cover" @click="checkToCloseSlidebar"></div>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
  import { Navbar, Sidebar, AppMain, TagsView } from './components'

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      TagsView
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    },
    methods: {
      checkToCloseSlidebar() {
        if (navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i) && this.$store.getters.sidebar.opened) {
          this.$store.dispatch('toggleSideBar')
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .main-container

  {
    background: #fbfbfb
  }
  }
</style>
