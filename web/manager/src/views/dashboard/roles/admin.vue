<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" v-show="lineChartData">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>
  </div>
</template>
<script>
  import CountTo from 'vue-count-to'
  import Mallki from '@/components/TextHoverEffect/Mallki'
  import mr from '../components/MemberAndRobot'
  import nc from '../components/NewCoins'
  import PanelGroup from '../components/PanelGroup'
  import LineChart from '../components/LineChart'
  import { getLineChart } from '../api'

  export default {
    name: 'Admin',
    components: {
      CountTo, Mallki, mr, nc, PanelGroup, LineChart
    },
    data() {
      return {
        lineChartDatas: undefined,
        lineChartData: undefined
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleSetLineChartData(type) {
        if (this.lineChartDatas) {
          this.lineChartData = this.lineChartDatas.map(d => {
            return { Date: d.Date, Data: d[type] }
          })
        }
      },
      fetchData() {
        getLineChart().then(res => {
          this.lineChartDatas = res.data
          this.handleSetLineChartData('member')
        })
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
