<template>
  <div class="dashboard-editor-container" v-if="dashboard">
    <el-row class="panel-group" :gutter="40">
      <el-col :xs="24" :sm="8" :lg="8" class="card-panel-col">
        <div class='card-panel'>
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="user" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">消费商数量</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="dashboard.TotalMember" :duration="2000"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="people" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">股东总数</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="dashboard.CurrentRounds" :duration="2000"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shoppingCard">
            <svg-icon icon-class="table" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">上次备份</div>
            <span class="card-panel-num">{{dashboard.LastBackupDate|parseTime('{y}-{m}-{d}')}}</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top:10px;">
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <div class="card statustic-card">
          <div class="card-header borderless">
            <h5>奖金</h5>
          </div>
          <div class="card-block text-center">
            <span class="d-block text-c-blue f-36">￥&nbsp;{{dashboard.Bills.RemainBonus.toFixed(2)}}</span>
          </div>
          <div class="card-footer bg-c-blue">
            <h6 class="text-white m-b-0">累计:&nbsp;￥{{dashboard.Bills.TotalBonus.toFixed(2)}}</h6>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <div class="card statustic-card">
          <div class="card-header borderless">
            <h5>提现</h5>
          </div>
          <div class="card-block text-center">
            <span class="d-block text-c-green f-36">￥&nbsp;{{dashboard.Bills.TotalWithdraw.toFixed(2)}}</span>
          </div>
          <div class="card-footer bg-c-green">
            <h6 class="text-white m-b-0">冻结:&nbsp;￥{{dashboard.Bills.FrozenWithdraw.toFixed(2)}}</h6>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <div class="card statustic-card">
          <div class="card-header borderless">
            <h5>报单币</h5>
          </div>
          <div class="card-block text-center">
            <span class="d-block text-c-yellow f-36">￥&nbsp;{{dashboard.Bills.TotalBaoDan.toFixed(2)}}</span>
          </div>
          <div class="card-footer bg-c-yellow">
            <h6 class="text-white m-b-0">余额:&nbsp;￥{{dashboard.Bills.RemainBaoDan.toFixed(2)}}</h6>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import CountTo from 'vue-count-to'
  import Mallki from '@/components/TextHoverEffect/Mallki'

  export default {
    name: 'Admin',
    components: {
      CountTo, Mallki
    },
    data() {
      return {
        dashboard: undefined
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../styles/panels.scss';

  .card {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 0.25rem;
    -webkit-box-shadow: 0 2px 10px -1px rgba(69,90,100,0.3);
    box-shadow: 0 2px 10px -1px rgba(69,90,100,0.3);
    border: none;
    margin-bottom: 30px;
    -webkit-transition: all 0.3s ease-in-out;
  }

  .card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
    border-bottom: 1px solid rgba(0,0,0,.125);
  }

    .card-header:first-child {
      border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
    }

  .card .card-header {
    background-color: transparent;
    border-bottom: 1px solid rgba(0,0,0,0.125);
    padding: 20px 30px;
    position: relative;
  }

    .card .card-header.borderless {
      border-bottom: 0px solid transparent;
    }

    .card .card-header h5 {
      margin-top: 5px;
      margin-bottom: 0;
      color: #37474f;
      font-size: 1.1rem;
      padding: 3px;
      font-weight: 600;
      display: inline-block;
      margin-right: 10px;
      line-height: 1.1;
    }

  .card .card-block {
    padding: 0.98rem;
  }


  .statustic-card .card-block {
    position: relative;
  }

  .card .card-header.borderless + .card-block, .card .card-header.borderless + .card-block-big, .card .card-header.borderless + .card-block-small {
    padding-top: 0;
  }


  .card .card-footer {
    border-top: 1px solid rgba(0,0,0,0.125);
    padding: 15px 20px;
    border-radius: 0 0 5px 5px;
  }

  h6 {
    margin: 0;
    font-size: 0.875rem;
  }

  .m-b-0 {
    margin-bottom: 0px;
  }

  .text-white {
    color: #fff !important;
  }

  .f-36 {
    font-size: 36px;
  }

  .text-c-blue {
    color: #448aff;
  }

  .bg-c-blue {
    background: #448aff;
  }

  .text-c-green {
    color: #9ccc65;
  }

  .bg-c-green {
    background: #9ccc65;
  }

  .text-c-yellow {
    color: #ffba57;
  }


  .bg-c-yellow {
    background: #ffba57;
  }
</style>
