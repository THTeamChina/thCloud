<template>
  <div class="app-container">
    <div class="filter-container">
      <hallquery v-model="listQuery.hallKey" class="filter-item" :type="3" placeholder="交易大厅"></hallquery>

      <el-date-picker v-model="dateRange" class="filter-item" style="max-width:100%" clearable
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">过滤</el-button>
    </div>
    <el-table :data="list" class="tradinghistory" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="大厅名称" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.HallName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="买家" align="center">
        <template align="center" slot-scope="scope">
          <div>
            <el-button type="text" @click="handleDetail(scope.row.Buyer.ID)">{{scope.row.Buyer.Name}}-[{{scope.row.Buyer.LoginName}}]</el-button>
            <div>
              <ul>
                <li>
                  <label>花费游戏币:</label>
                  <span>{{-scope.row.GameCoin.toFixed(2)}}</span>
                </li>
                <li>
                  <label>应获杜仲:</label>
                  <span>{{scope.row.Count.toFixed(2)}}</span>
                </li>
                <li>
                  <label>手续费:</label>
                  <span>{{(scope.row.Count-scope.row.CountAfterTax).toFixed(2)}}</span>
                </li>
                <li>
                  <label>实际入账:</label>
                  <span>{{scope.row.CountAfterTax.toFixed(2)}}</span>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="卖家" align="center">
        <template align="center" slot-scope="scope">
          <div>
            <el-button type="text" @click="handleDetail(scope.row.Seller.ID)">{{scope.row.Seller.Name}}-[{{scope.row.Seller.LoginName}}]</el-button>
            <div>
              <ul>
                <li>
                  <label>消耗杜仲:</label>
                  <span>{{scope.row.Count.toFixed(2)}}</span>
                </li>
                <li>
                  <!--<label>应获灵豆:</label>-->
                  <label>应获注册币:</label>
                  <span>{{scope.row.LingDou.toFixed(2)}}</span>
                </li>
                <li>
                  <label>手续费:</label>
                  <span>{{(scope.row.LingDou-scope.row.LingDouAfterTax).toFixed(2)}}</span>
                </li>
                <li>
                  <label>实际入账:</label>
                  <span>{{scope.row.LingDouAfterTax.toFixed(2)}}</span>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="交易时间" align="center" width="100">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Created|parseTime}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-size="listQuery.pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <memberdetail :id="detailID" :visible="detailVisiable" @update:visible="val => detailVisiable = val"></memberdetail>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getList } from './api'
  import hallquery from '../controls/hallquery'
  import memberdetail from '../controls/memberdetail'

  export default {
    name: 'TradingRecords',
    components: {
      memberdetail, hallquery
    },
    data() {
      return {
        list: [],
        listQuery: {
          hallKey: undefined,
          start: undefined,
          end: undefined,
          page: 1,
          pageSize: 10
        },
        total: 0,
        isLoading: false,

        detailID: undefined,
        detailVisiable: false,

        member: undefined
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listLoading = true
        this.listQuery.page = 1
        this.fetchData()
      },
      handleDetail(id) {
        this.detailID = id
        this.detailVisiable = true
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchData()
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ]),
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
<style scoped>
  .tradinghistory ul, .tradinghistory li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
