<template>
  <div>
    <el-dialog title="会员信息" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="fetchData" :fullscreen="equip">
      <div style="min-height:200px" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-tabs v-if="detail">
          <el-tab-pane label="基本信息">
            <ul class="clearfix">
              <li>
                <label>姓名:</label>
                <span>{{detail.Name}}</span>
              </li>
              <li>
                <label>编号:</label>
                <span>{{detail.No}}</span>
              </li>
              <li>
                <label>等级:</label>
                <span>{{detail.Level|levelTxt}}</span>
              </li>
              <li v-if="detail.Recommend">
                <label>推荐人:</label>
                <span>{{detail.Parent.Name}} - {{detail.Parent.No}}</span>
              </li>
              <li>
                <label>推荐数量:</label>
                <span>{{detail.ChildrenCount}}</span>
              </li>
              <li>
                <label>最后登陆:</label>
                <span>{{detail.LastLogin|parseTime}}</span>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="机器人">
            <ul class="clearfix">
              <li>
                <label>工作中:</label>
                <span>{{detail.Robot.Working}}</span>
              </li>
              <li>
                <label>待采摘:</label>
                <span>{{detail.Robot.Paused}}</span>
              </li>
              <li>
                <label>待充电:</label>
                <span>{{detail.Robot.LowPower}}</span>
              </li>
              <li>
                <label>无充电桩:</label>
                <span>{{detail.Robot.NoPower}}</span>
              </li>
              <li>
                <label>已销毁:</label>
                <span>{{detail.Robot.Destroy}}</span>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="账户信息">
            <ul class="clearfix">
              <li>
                <label>游戏币:</label>
                <span>{{detail.Coins.GameCoin}}</span>
              </li>
              <li>
                <label>充电币:</label>
                <span>{{detail.Coins.ChongDianBi}}</span>
              </li>
              <li>
                <label>注册币:</label>
                <span>{{detail.Coins.ZhuCeBi}}</span>
              </li>
              <li>
                <label>购物币:</label>
                <span>{{detail.Coins.GouWuCoin}}</span>
              </li>
              <li>
                <label>杜仲:</label>
                <span>{{detail.Coins.DuZhong}}</span>
              </li>
              <li>
                <label>分红:</label>
                <span>{{detail.Coins.FenHong}}</span>
              </li>
              <li>
                <label>分红点:</label>
                <span>{{detail.Coins.FenHongDian}}</span>
              </li>
              <li>
                <label>灵豆:</label>
                <span>{{detail.Coins.LingDou}}</span>
              </li>
              <li>
                <label>积分:</label>
                <span>{{detail.Coins.JiFen}}</span>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="收货地址" v-if="detail.Address&&detail.Address.length">
            <el-row :gutter="10">
              <el-col class="address" v-for="(item, index) in detail.Address" :key="'items.' + index" :span="12" :xs="24" style="margin:5px 0">
                <el-card :body-style="{ padding: '20px' }">
                  <el-badge value="默认" :hidden="!item.IsDefault">
                  </el-badge>
                  <ul class="clearfix">
                    <li>
                      <label>收货人:</label>
                      <span>{{item.Name}}</span>
                    </li>
                    <li>
                      <label>联系电话:</label>
                      <span>{{item.Phone}}</span>
                    </li>
                    <li>
                      <label>详细地址:</label>
                      <span>{{item.Address}}</span>
                    </li>
                  </ul>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="提现管理" v-if="detail.Ways&&detail.Ways.length">
            <el-row :gutter="10">
              <el-col class="withdraw" v-for="(item, index) in detail.Ways" :key="'items.' + index" :span="12" :xs="24" style="margin:5px 0">
                <el-card :body-style="{ padding: '20px' }">
                  <ul class="clearfix">
                    <li>
                      <label>方式:</label>
                      <span>{{item.Way}}</span>
                    </li>
                    <li>
                      <label>姓名:</label>
                      <span>{{item.Name}}</span>
                    </li>
                    <li>
                      <label>账号:</label>
                      <span>{{item.No}}</span>
                    </li>
                  </ul>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getDetail } from '../members/api'

  export default {
    name: 'memberdetail',
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
