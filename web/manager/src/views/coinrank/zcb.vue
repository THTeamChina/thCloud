<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves @click="handleFilter">刷新</el-button>
    </div>
    <div style="margin-bottom:10px">
      <el-tag>
        <label>总计：</label>
        <span>{{totalsum}}</span>
      </el-tag>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>

      <el-table-column label="姓名/登录名" align="center">
        <template align="center" slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row.ID)">{{scope.row.Name}}-[{{scope.row.LoginName}}]</el-button>
        </template>
      </el-table-column>

      <el-table-column label="金额" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Amount.toFixed(2)}}</span>
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
  import { getzcbRank } from './api'
  import memberdetail from '../controls/memberdetail'

  export default {
    components: {
      memberdetail
    },
    data() {
      return {
        list: [],
        listQuery: {
          page: 1,
          pageSize: 10
        },
        total: 0,
        totalsum: 0,
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
        getzcbRank(this.listQuery.page).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.totalsum = response.data.totalsum
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listLoading = true
        this.listQuery.page = 1
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchData()
      }
    }
  }
</script>
