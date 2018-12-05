<template>
  <div>
    <el-dialog title="交易大厅明细" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="fetchData" :fullscreen="equip">
      <div style="min-height:200px" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-tabs v-if="detail">
          <el-tab-pane label="基本信息">
            <ul class="clearfix">
              <li>
                <label>名称:</label>
                <span>{{detail.Name}}</span>
              </li>
              <li>
                <label>状态:</label>
                <span>{{detail.Status|hallStatusTxt}}</span>
              </li>
              <li>
                <label>最小交易量（杜仲）:</label>
                <span>{{detail.MinDeposit}}</span>
              </li>
              <li v-if="detail.Owner">
                <label>推荐人:</label>
                <span>{{detail.Owner.Name}} - {{detail.Owner.No}}</span>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="交易统计">
            <h3 style="padding:5px;margin:0">交易量统计</h3>
            <ul class="clearfix">
              <li>
                <label>挂单:</label>
                <span>{{detail.Tradings.Total}}</span>
              </li>
              <li>
                <label>买单数量:</label>
                <span>{{detail.Tradings.Buy}}</span>
              </li>
              <li>
                <label>卖单数量:</label>
                <span>{{detail.Tradings.Sell}}</span>
              </li>
            </ul>
            <h3 style="padding:5px;margin:0">交易额统计</h3>
            <ul class="clearfix">
              <li>
                <label>金额:</label>
                <span>{{detail.Amount.Total}}</span>
              </li>
              <li>
                <label>买单金额:</label>
                <span>{{detail.Amount.Buy}}</span>
              </li>
              <li>
                <label>卖单金额:</label>
                <span>{{detail.Amount.Sell}}</span>
              </li>
              <li>
                <label>成交金额:</label>
                <span>{{detail.Amount.Deal}}</span>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="今日统计">
            <h3 style="padding:5px;margin:0">交易量统计</h3>
            <ul class="clearfix">
              <li>
                <label>挂单:</label>
                <span>{{detail.Today.Tradings.Total}}</span>
              </li>
              <li>
                <label>买单数量:</label>
                <span>{{detail.Today.Tradings.Buy}}</span>
              </li>
              <li>
                <label>卖单数量:</label>
                <span>{{detail.Today.Tradings.Sell}}</span>
              </li>
            </ul>
            <h3 style="padding:5px;margin:0">交易额统计</h3>
            <ul class="clearfix">
              <li>
                <label>金额:</label>
                <span>{{detail.Today.Amount.Total}}</span>
              </li>
              <li>
                <label>买单金额:</label>
                <span>{{detail.Today.Amount.Buy}}</span>
              </li>
              <li>
                <label>卖单金额:</label>
                <span>{{detail.Today.Amount.Sell}}</span>
              </li>
              <li>
                <label>成交金额:</label>
                <span>{{detail.Today.Amount.Deal}}</span>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getDetail } from './api'

  export default {
    name: 'halldetail',
    props: {
      id: {
        type: Number,
        default: 0
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      dialogVisible: {
        get() {
          return this.visible
        },
        set(newVal) {
          this.$emit('update:visible', newVal)
        }
      }
    },
    data() {
      return {
        detail: undefined,
        loading: false,
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i)
      }
    },
    methods: {
      fetchData() {
        this.detail = undefined
        if (this.loading) {
          return
        }
        this.loading = true
        getDetail(this.id).then(res => {
          this.detail = res.data
          this.loading = false
        })
      }
    }
  }
</script>
<style scoped>

  ul, li {
    list-style: none;
  }

  ul {
    position: relative;
    padding: 10px 20px;
    margin: 0;
  }

    ul > li {
      padding: 0;
      margin: 0;
      width: 50%;
      float: left;
      line-height: 30px;
    }

      ul > li label {
        width: 80px;
        display: inline-block;
      }

  .withdraw ul > li, .address ul > li {
    width: 100%;
  }

  .withdraw, .address {
    position: relative;
  }

    .address .el-badge {
      position: absolute;
      right: 20px;
    }

    .withdraw ul, .address ul {
      margin: 0;
      padding: 0;
    }


      .withdraw ul > li label {
        width: 40px;
      }

  h2 {
    margin: 0;
    padding: 0 20px;
  }

  @media screen and (min-width: 320px) and (max-width: 480px) {
    ul > li {
      width: 100%;
    }
  }

  .el-form-item {
    margin-bottom: 0;
  }
</style>
