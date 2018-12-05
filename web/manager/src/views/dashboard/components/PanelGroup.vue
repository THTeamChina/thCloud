<template>
  <el-row class="panel-group" :gutter="40" v-if="Report">
    <el-col :xs="12" :sm="6" :lg="4" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('member')">
        <div class="card-panel-description">
          <div class="card-panel-text">会员</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="Report.Members" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="6" :lg="4" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('robot')">
        <div class="card-panel-description">
          <div class="card-panel-text">机器人</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="Report.Robots" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="6" :lg="4" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('duzhong')">
        <div class="card-panel-description">
          <div class="card-panel-text">杜仲</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="Report.DuZhong" :duration="2600" :decimals="2"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="6" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('lingdou')">
        <div class="card-panel-description">
          <div class="card-panel-text">灵豆</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="Report.LingDou" :duration="3600" :decimals="2"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="6" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('fenhong')">
        <div class="card-panel-description">
          <div class="card-panel-text">分红</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="Report.FenHong" :duration="3000" :decimals="2"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="6" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('fenhongdian')">
        <div class="card-panel-description">
          <div class="card-panel-text">分红点</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="Report.FenHongDian" :duration="3200"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'
  import { getTotal } from '../api'

  export default {
    components: {
      CountTo
    },
    data() {
      return {
        Report: undefined
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      },
      fetchData() {
        getTotal().then(res => {
          this.Report = res.data
        })
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 18px;
    .card-panel-col

  {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover

  {
    .card-panel-icon-wrapper

  {
    color: #fff;
  }

  .icon-people {
    background: #40c9c6;
  }

  .icon-message {
    background: #36a3f7;
  }

  .icon-money {
    background: #f4516c;
  }

  .icon-shoppingCard {
    background: #34bfa3
  }

  }

  .icon-people {
    color: #40c9c6;
  }

  .icon-message {
    color: #36a3f7;
  }

  .icon-money {
    color: #f4516c;
  }

  .icon-shoppingCard {
    color: #34bfa3
  }

  .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }

  .card-panel-icon {
    float: left;
    font-size: 48px;
  }

  .card-panel-description {
    width:100%;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;
    text-align: center;
    .card-panel-text

  {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }

  .card-panel-num {
    font-size: 20px;
  }

  }
  }
  }
</style>
