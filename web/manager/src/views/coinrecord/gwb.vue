<template>
  <div class="app-container">
    <div class="filter-container">
      <memberquery v-model="listQuery.member" class="filter-item" placeholder="会员"></memberquery>
      <el-date-picker v-model="dateRange" class="filter-item" style="max-width:100%" clearable
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">过滤</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="rechargeVisible=true" type="success" icon="el-icon-plus" v-if="hasRole(['Administrators','Managers'])">充值</el-button>
    </div>
    <div style="margin-bottom:10px">
      <el-tag>
        <label>总计：</label>
        <span>{{coinin-coinout}}</span>
      </el-tag>
      <el-tag style="margin-left:10px">
        <label>产生：</label>
        <span>{{coinin}}</span>
      </el-tag>
      <el-tag style="margin-left:10px">
        <label>消耗：</label>
        <span>{{coinout}}</span>
      </el-tag>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="会员" align="center">
        <template align="center" slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row.Member.ID)">{{scope.row.Member.Name}} [{{scope.row.Member.LoginName}}]</el-button>
        </template>
      </el-table-column>
      <el-table-column width="120" label="金额" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Remark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.Created|parseTime}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-size="listQuery.pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>

    <memberdetail :id="detailID" :visible="detailVisiable" @update:visible="val => detailVisiable = val"></memberdetail>
    <rechargeform :visible="rechargeVisible" @update:visible="val => rechargeVisible = val" @success="fetchData" />
  </div>
</template>
<script>
  import memberquery from '../controls/memberquery'
  import memberdetail from '../controls/memberdetail'
  import rechargeform from '../controls/rechargeform'

  import { getList } from './api'

  export default {
    name: 'coins',
    components: {
      memberquery, memberdetail, rechargeform
    },
    data() {
      return {
        list: undefined,
        listQuery: {
          type: 6,
          member: undefined,
          start: undefined,
          end: undefined,
          page: 1,
          pageSize: 10
        },
        coinin: 0,
        coinout: 0,
        total: 0,
        listLoading: false,

        detailID: undefined,
        detailVisiable: false,
        rechargeVisible: false
      }
    },
    created() {
      console.log(this.$route)
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.coinin = response.data.coinin
          this.coinout = response.data.coinout
          this.listLoading = false
        })
      },
      handleDetail(id) {
        this.detailID = id
        this.detailVisiable = true
      },
      handleFilter() {
        this.listLoading = true
        this.listQuery.page = 1
        this.fetchData()
      },
      handleSuccess() {
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchData()
      }
    },
    computed: {
      dateRange: {
        get: function () {
          return [this.listQuery.start, this.listQuery.end]
        },
        set: function (val) {
          if (val) {
            this.listQuery.start = val[0]
            this.listQuery.end = val[1]
          } else {
            this.listQuery.start = undefined
            this.listQuery.end = undefined
          }
        }
      }
    }
  }
</script>
