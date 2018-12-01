<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="管理员 昵称/登录名" v-model="listQuery.key" clearable>
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">过滤</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-plus" v-role="['Administrators']">添加</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="65" type="index">
      </el-table-column>
      <el-table-column label="登录名" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.LoginName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名/昵称" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.NickName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名/昵称" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Role|roleTxt}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次登录" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.LastLogin|parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <div v-if="deletingID!==scope.row.ID">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deletingID=scope.row.ID">删除</el-button>
          </div>
          <div v-else>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">确定</el-button>
            <el-button type="" size="mini" @click="deletingID=undefined">取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <accountform :account="edit" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @success="handleSuccess"></accountform>
  </div>
</template>
<script>
  import { getList, delAccount } from '@/api/account'
  import waves from '@/directive/waves' // 水波纹指令

  import accountform from './create'

  export default {
    components: {
      accountform
    },
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        listQuery: {
          key: undefined,
          page: 1,
          pagesize: 10
        },
        total: 0,
        listLoading: true,
        dialogVisible: false,
        edit: undefined,
        deletingID: undefined
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
      handleCreate() {
        this.edit = null
        this.dialogVisible = true
      },
      handleUpdate(item) {
        this.edit = item
        this.dialogVisible = true
      },
      handleSuccess() {
        this.fetchData()
      },
      handleDelete() {
        if (this.deletingID) {
          delAccount(this.deletingID).then(() => {
            this.fetchData()
            this.deletingID = undefined
          })
        }
      },
      handleSizeChange(val) {
        this.listQuery.pagesize = val
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
