<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="机器人名称" v-model="listQuery.key" clearable>
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">过滤</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-plus" v-if="hasRole(['Administrators','Managers'])">新增</el-button>-->
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="图片" align="center" width="220">
        <template align="center" slot-scope="scope">
          <img :src="scope.row.Photo" v-if="scope.row.Photo" style="width:200px;height:auto" />
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" width="120">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" label="价格" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Price}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" label="间隔时间" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Duration}} 小时</span>
        </template>
      </el-table-column>
      <el-table-column label="每次产出" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Min}} - {{scope.row.Max}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总产量" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Output}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="160">
        <template slot-scope="scope">
          <div v-if="statusID!==scope.row.ID">
            <span>{{scope.row.Visiable?'启用中':'停用'}}</span>
            <el-button type="danger" size="mini" @click="statusID=scope.row.ID" v-if="!scope.row.IsDefault&&!scope.row.Visiable&&hasRole(['Administrators','Managers'])">启用</el-button>
            <el-button type="success" size="mini" @click="statusID=scope.row.ID" v-if="!scope.row.IsDefault&&scope.row.Visiable&&hasRole(['Administrators','Managers'])">停用</el-button>
          </div>
          <div v-else>
            <el-button type="danger" size="mini" @click="handleStatus(scope.row)">确定</el-button>
            <el-button type="" size="mini" @click="statusID=undefined">取消</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <div v-if="deletingID!==scope.row.ID">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)" v-if="hasRole(['Administrators','Managers'])">修改</el-button>
            <el-button type="danger" size="mini" @click="deletingID=scope.row.ID" v-if="!scope.row.IsDefault&&hasRole(['Administrators','Managers'])">删除</el-button>
          </div>
          <div v-else>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">确定</el-button>
            <el-button type="" size="mini" @click="deletingID=undefined">取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <robotform :robot="robot" :visible="formVisiable" @update:visible="val => formVisiable = val" @success="fetchData"></robotform>
  </div>
</template>
<script>
  import { getList, postStatus, delRobot } from './api'
  import robotform from './form'

  export default {
    name: 'robots',
    components: {
      robotform
    },
    data() {
      return {
        list: undefined,
        listQuery: {
          key: undefined,
          page: 1,
          pageSize: 10
        },
        total: 0,
        listLoading: false,

        statusID: undefined,
        deletingID: undefined,

        robot: undefined,
        formVisiable: false
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
      handleSuccess() {
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchData()
      },
      handleStatus(item) {
        postStatus(item.ID).then(res => {
          this.$message({
            center: true,
            showClose: true,
            message: '状态变更成功',
            type: 'success'
          })
          this.statusID = undefined
          this.fetchData()
        }).catch(err => {
          this.$message({
            center: true,
            showClose: true,
            message: err.message,
            type: 'error'
          })
          this.statusID = undefined
          this.fetchData()
        })
      },
      handleEdit(item) {
        this.robot = item
        this.formVisiable = true
      },
      handleCreate() {
        this.robot = undefined
        this.formVisiable = true
      },
      handleDelete(item) {
        delRobot(item.ID).then(res => {
          this.$message({
            center: true,
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.statusID = undefined
          this.fetchData()
        }).catch(err => {
          this.$message({
            center: true,
            showClose: true,
            message: err.message,
            type: 'error'
          })
          this.statusID = undefined
          this.fetchData()
        })
      }
    }
  }
</script>
