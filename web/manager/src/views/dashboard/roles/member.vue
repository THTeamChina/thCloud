<template>
  <div class="dashboard-editor-container" v-if="dashboard">
    <el-row :gutter="20" style="margin-top:10px;">
      <el-col :xs="24" :span="24">
        <el-row :gutter="20">

          <el-col :xs="24" :span="12">
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
          <el-col :xs="24" :span="12">
            <div class="card statustic-card">
              <div class="card-header borderless">
                <h5>购物币</h5>
              </div>
              <div class="card-block text-center">
                <span class="d-block text-c-yellow f-36">￥&nbsp;{{dashboard.Bills.RemainGouWu.toFixed(2)}}</span>
              </div>
              <div class="card-footer bg-c-yellow">
                <h6 class="text-white m-b-0">累计:&nbsp;￥{{dashboard.Bills.TotalGouWu.toFixed(2)}}</h6>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :span="12">
            <div class="card statustic-card">
              <div class="card-header borderless">
                <h5>积分</h5>
              </div>
              <div class="card-block text-center">
                <span class="d-block text-c-green f-36">￥&nbsp;{{dashboard.Bills.RemainJifen.toFixed(2)}}</span>
              </div>
              <div class="card-footer bg-c-green">
                <h6 class="text-white m-b-0">累计:&nbsp;￥{{dashboard.Bills.TotalJifen.toFixed(2)}}</h6>
              </div>
            </div>
          </el-col>

          <el-col :xs="24" :span="12" v-role="['Centers']">
            <div class="card statustic-card">
              <div class="card-header borderless">
                <h5>报单币</h5>
              </div>
              <div class="card-block text-center">
                <span class="d-block text-c-red f-36">￥&nbsp;{{dashboard.Bills.RemainBaoDan.toFixed(2)}}</span>
              </div>
              <div class="card-footer bg-c-red">
                <h6 class="text-white m-b-0">累计:&nbsp;￥{{dashboard.Bills.TotalBaoDan.toFixed(2)}}</h6>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>

    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :span="6" :sm="24" :md="12" style="margin-bottom:20px;">
        <el-card class="box-card">
          <div class="text-center usercard">
            <h4 style="padding:20px 5px 5px;margin:0">
              <svg-icon :icon-class="'l'+(dashboard.Member.Level+1)" class-name="font-5x level" />
            </h4>
            <h2 style="padding:5px 0  20px;margin:0">
              {{dashboard.Member.NickName}}
            </h2>
            <h3 style="padding:5px 0 10px;margin:0">编号： {{dashboard.Member.No}}</h3>
            <el-row>
              <el-col :span="12">
                <h5 style="padding:5px 0;margin:0;color:#868e96">左区</h5>
                <p style="padding:5px 0;margin:0;color:#b7b7b7;font-size:14px;"><span style="font-size: 30px; padding-right:5px;color:#65b729;font-weight:bold">{{dashboard.Member.LeftCount}}</span>人</p>
                <p style="padding:5px 0;margin:0;font-size:22px; font-weight:bold" class="text-c-red">{{dashboard.Member.LeftYeji.toFixed(2)}}</p>
              </el-col>
              <el-col :span="12">
                <h5 style="padding:5px 0;margin:0;color:#868e96">右区</h5>
                <p style="padding:5px 0;margin:0;color:#b7b7b7;font-size:14px;"><span style="font-size: 30px; padding-right:5px;color:#65b729;font-weight:bold">{{dashboard.Member.RightCount}}</span>人</p>
                <p style="padding:5px 0;margin:0;font-size:22px; font-weight:bold" class="text-c-red">{{dashboard.Member.RightYeji.toFixed(2)}}</p>
              </el-col>
            </el-row>
          </div>
          <el-button type="success" style="width:100%;border-radius:0 0 5px 5px;line-height:20px" @click="upgradeVisible=true" v-if="dashboard.Member.CanUpgrade">升级</el-button>
          <div v-if="dashboard.Member.Upgrading" class="text-center" style="margin-bottom:20px">
            <h3>升级中</h3>
            <p style="font-size:14px">请联系服务中心: <span>{{dashboard.Member.ContractMember.NickName}}  -- {{dashboard.Member.ContractMember.Phone}}</span></p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :span="18" :sm="24" :md="12" style="margin-bottom:20px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>通知公告</span>
          </div>
          <div v-if="articles&&articles.length">
            <ul style="margin:0 20px;padding:0">
              <li v-for="item in articles" class="clearfix" style="position: relative;border-bottom:1px dashed #eee">
                <div class="clearfix" style="float: left;max-width: 100%;">
                  <el-button type="text" @click="handleDetail(item.ID)" style="white-space: nowrap;text-overflow: ellipsis;width: 100%;overflow: hidden;padding-right: 100px;">{{item.Title}}</el-button>
                </div>
                <span style="font-size: 0.875rem;color: rgb(149, 149, 149);padding: 10px 20px 10px 0;position: absolute;right: 0px;">{{item.Created|parseTime('{y}-{m}-{d}')}}</span>
              </li>
            </ul>
            <div class="pagination-container" style="padding:10px 20px;">
              <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </div>
          <div style="min-height:50px; text-align:center" v-else>
            <p style="padding:30px; color:#949494">暂无数据</p>
          </div>

        </el-card>
      </el-col>
    </el-row>

    <articledetail :id="articleid" :visible="detailVisible" @update:visible="val => detailVisible = val"></articledetail>
  </div>
</template>
<script>
  import CountTo from 'vue-count-to'
  import Mallki from '@/components/TextHoverEffect/Mallki'
  import articledetail from '../../controls/articledetail'

  export default {
    name: 'Admin',
    components: {
      CountTo, Mallki, articledetail
    },
    data() {
      return {
        dashboard: undefined,
        listQuery: {
          page: 1
        },
        articles: [],
        articleid: undefined,
        total: 0,
        detailVisible: false
      }
    },
    created() {
      this.fetchData()
      this.fetchArticles()
    },
    methods: {
      fetchData() {
      },
      fetchArticles() {
      },
      handleSuccess() {
        this.fetchData()
      },
      handleDetail(id) {
        this.articleid = id
        this.detailVisible = true
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchData()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../styles/panels.scss';

  .usercard .el-row {
    padding: 20px 0;
  }

  .usercard .el-col + .el-col {
    border-left: 1px solid #d6d6d6;
  }

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

  .text-c-red {
    color: #ff5252;
  }

  .bg-c-red {
    background: #ff5252;
  }
</style>
<style rel="stylesheet/scss" lang="scss">
</style>
