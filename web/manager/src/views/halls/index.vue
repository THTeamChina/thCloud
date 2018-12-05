<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="会员 编号/姓名/电话" v-model="listQuery.key" clearable>
      </el-input>
      <memberquery v-model="listQuery.owner" class="filter-item" placeholder="所属人"></memberquery>

      <el-select clearable class="filter-item" v-model="listQuery.level" placeholder="状态">
        <el-option v-for="(item,index) in 3" :key="item" :label="index|hallStatusTxt" :value="index">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">过滤</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-plus" v-if="hasRole(['Administrators','Managers'])">新增</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="名称" align="center">
        <template align="center" slot-scope="scope">
          <el-button type="text" @click="handleHallDetail(scope.row.ID)">{{scope.row.Name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="最小交易量（杜仲）" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.MinDeposit}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费" align="center">
        <template align="center" slot-scope="scope">
          <span>{{(scope.row.Tax*100).toFixed(2)}}%</span>
        </template>
      </el-table-column>
      <el-table-column label="所属人" align="center">
        <template align="center" slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row.Owner.ID)" v-if="scope.row.Owner">{{scope.row.Owner.Name}} - {{scope.row.Owner.No}}</el-button>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div v-if="statusID!==scope.row.ID">
            <span>{{scope.row.Status|hallStatusTxt}}</span>
            <el-button type="danger" size="mini" @click="statusID=scope.row.ID" v-if="scope.row.Status===0&&hasRole(['Administrators','Managers'])&&!scope.row.IsSystemHall">关闭</el-button>
            <el-button type="success" size="mini" @click="statusID=scope.row.ID" v-if="scope.row.Status===2&&hasRole(['Administrators','Managers'])&&!scope.row.IsSystemHall">开启</el-button>
            <el-button type="warning" size="mini" @click="statusID=scope.row.ID" v-if="(scope.row.Status===1||scope.row.Status===3)&&hasRole(['Administrators','Managers'])&&!scope.row.IsSystemHall">取消</el-button>
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
            <el-button type="danger" size="mini" @click="deletingID=scope.row.ID" v-if="scope.row.Status===2&&hasRole(['Administrators','Managers'])&&!scope.row.IsSystemHall">删除</el-button>
          </div>
          <div v-else>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">确定</el-button>
            <el-button type="" size="mini" @click="deletingID=undefined">取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-size="listQuery.pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <memberdetail :id="detailID" :visible="detailVisiable" @update:visible="val => detailVisiable = val"></memberdetail>
    <hallform :hall="hall" :visible="formVisiable" @update:visible="val => formVisiable = val" @success="fetchData" />
    <halldetail :id="hallID" :visible="hallVisiable" @update:visible="val => hallVisiable = val"></halldetail>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import memberquery from '../controls/memberquery'
  import memberdetail from '../controls/memberdetail'
  import hallform from './form'
  import halldetail from './detail'

  import { getList, postStatus, delHall } from './api'

  export default {
    name: 'Halls',
    components: {
      memberquery, memberdetail, hallform, halldetail
    },
    data() {
      return {
        list: undefined,
        listQuery: {
          key: undefined,
          owner: undefined,
          status: undefined,
          page: 1,
          pageSize: 10
        },
        isLoading: false,
        total: 0,

        detailID: undefined,
        detailVisiable: false,

        hall: undefined,
        formVisiable: false,

        deletingID: undefined,
        statusID: undefined,

        hallID: undefined,
        hallVisiable: false
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
      handleHallDetail(id) {
        this.hallID = id
        this.hallVisiable = true
      },
      handleCreate() {
        this.hall = undefined
        this.formVisiable = true
      },
      handleEdit(item) {
        this.hall = item
        this.formVisiable = true
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
        })
      },
      handleDelete(item) {
        delHall(item.ID).then(res => {
          this.$message({
            center: true,
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.deletingID = undefined
          this.fetchData()
        }).catch(err => {
          this.$message({
            center: true,
            showClose: true,
            message: err.message,
            type: 'success'
          })
          this.deletingID = undefined
          this.fetchData()
        })
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchData()
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    }
  }
</script>
