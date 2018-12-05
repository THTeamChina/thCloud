<template>
  <div class="app-container">
    <div class="filter-container">
      <memberquery v-model="listQuery.mkey" class="filter-item" placeholder="会员"></memberquery>

      <el-date-picker v-model="dateRange" class="filter-item" style="max-width:100%" clearable
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>

      <el-select v-model="listQuery.status" class="filter-item" placeholder="审核状态" clearable>
        <el-option v-for="(item,index) in 3"
                   :key="item"
                   :label="index|auditStatusTxt"
                   :value="index">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">过滤</el-button>
    </div>
    <div style="margin-bottom:10px">
      <el-tag>
        <label>待审核：</label>
        <span>{{requested}}</span>
      </el-tag>
      <el-tag style="margin-left:10px">
        <label>通过：</label>
        <span>{{approved}}</span>
      </el-tag>
      <el-tag style="margin-left:10px">
        <label>拒绝：</label>
        <span>{{declined}}</span>
      </el-tag>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>

      <el-table-column label="姓名/昵称" align="center" width="120">
        <template align="center" slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row.Member.ID)">{{scope.row.Member.Name}}-[{{scope.row.Member.LoginName}}]</el-button>
        </template>
      </el-table-column>

      <el-table-column label="购买礼包" align="center">
        <template align="center" slot-scope="scope">
          <span>名称：{{scope.row.Product.Name}}<br />金额：{{scope.row.Amount.toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Way|payWayTxt}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Created|parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人" align="center" width="100">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.AuditorName||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收货人" align="center" width="120">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.ReceiveName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center" width="120">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.ReceivePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="详细地址" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.ReceiveAddress}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template align="center" slot-scope="scope">
          <div v-if="auditintID!==scope.row.ID&&deletingID!==scope.row.ID">
            <div v-if="hasRole(['Administrators','Managers', 'Rechargors'])&&scope.row.Status==0">
              <el-button type="success" size="mini" @click="auditintID=scope.row.ID" v-if="scope.row.Status==0">通过</el-button>
              <el-button type="danger" size="mini" @click="deletingID=scope.row.ID" v-if="scope.row.Status==0">拒绝</el-button>
            </div>
            <span v-else>{{scope.row.Status|auditStatusTxt}}</span>
          </div>
          <div v-else>
            <el-button type="success" size="mini" @click="handleAudit(scope.row)" v-if="auditintID">确定通过</el-button>
            <el-button type="danger" size="mini" @click="handleAudit(scope.row)" v-if="deletingID">确定拒绝</el-button>
            <el-button type="" size="mini" @click="auditintID=undefined;deletingID=undefined">取消</el-button>
          </div>
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
  import { getList, postApproved, postDeclined } from './api'
  import memberquery from '../controls/memberquery'
  import memberdetail from '../controls/memberdetail'

  export default {
    name: 'MemberList',
    components: {
      memberquery, memberdetail
    },
    data() {
      return {
        list: [],
        listQuery: {
          mkey: undefined,
          status: undefined,
          start: undefined,
          end: undefined,
          akey: undefined,
          page: 1,
          pageSize: 10
        },
        total: 0,
        declined: 0,
        approved: 0,
        requested: 0,
        isLoading: false,

        detailID: undefined,
        detailVisiable: false,

        auditintID: undefined,
        deletingID: undefined,

        member: undefined,

        rechargeVisible: false
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
          this.requested = response.data.requested
          this.approved = response.data.approved
          this.declined = response.data.declined
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
      },
      handleAudit(item) {
        if (this.auditintID) {
          postApproved(item.ID).then(res => {
            item.Status = 1
            this.auditintID = undefined
            this.$message({
              center: true,
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
          }).catch(error => {
            this.$message({
              center: true,
              showClose: true,
              message: error.message,
              type: 'error'
            })
          })
        } else if (this.deletingID) {
          postDeclined(item.ID).then(res => {
            item.Status = 2
            this.deletingID = undefined
            this.$message({
              center: true,
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
          }).catch(error => {
            this.$message({
              center: true,
              showClose: true,
              message: error.message,
              type: 'error'
            })
          })
        }
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
