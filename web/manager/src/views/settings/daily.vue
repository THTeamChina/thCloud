<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="dateRange" class="filter-item" style="max-width:100%" clearable
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">过滤</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="日期" align="center" width="120">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Date|parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分红数量" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Amount.toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div v-if="resetID!==scope.row.ID">
            <el-button type="warning" size="mini" @click="resetID=scope.row.ID">删除</el-button>
          </div>
          <div v-else>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">确定</el-button>
            <el-button type="" size="mini" @click="resetID=undefined">取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-size="listQuery.pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <createform :visible="formVisiable" @update:visible="val => formVisiable = val" @success="handleSuccess"></createform>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getDailyList, delDaily } from './api'
  import createform from './form'

  export default {
    name: 'DailySettings',
    components: {
      createform
    },
    data() {
      return {
        list: [],
        listQuery: {
          start: undefined,
          end: undefined,
          page: 1,
          pageSize: 10
        },
        total: 0,
        isLoading: false,

        resetID: undefined,

        formVisiable: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getDailyList(this.listQuery).then(response => {
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
      handleDelete(item) {
        delDaily(item.ID).then(res => {
          this.$message({
            center: true,
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.fetchData()
          this.resetID = undefined
        })
      },
      handleSuccess() {
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchData()
      },
      handleCreate() {
        this.formVisiable = true
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
