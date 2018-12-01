<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="会员 编号/姓名/电话" v-model="listQuery.key" clearable>
      </el-input>
      <memberquery v-model="listQuery.recommend" class="filter-item" placeholder="推荐人"></memberquery>
      <el-select clearable class="filter-item" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="(item,index) in 4" :key="item" :label="index|memberTypeTxt" :value="index">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" v-model="listQuery.level" placeholder="级别">
        <el-option v-for="(item,index) in 7" :key="item" :label="index|levelTxt" :value="index">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">过滤</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-plus" v-if="hasRole(['Administrators','Managers'])">新增</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="rechargeVisible=true" type="success" icon="el-icon-plus" v-if="hasRole(['Administrators','Managers'])">充值</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="登录名" align="center" width="120">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.LoginName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名/昵称" align="center" width="120">
        <template align="center" slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row.ID)">{{scope.row.Name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="身份证号">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.IDCard}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" label="电话" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Phone}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" label="类型" align="center">
        <template align="center" slot-scope="scope">
          <span>{{scope.row.Type|memberTypeTxt}}</span>
        </template>
      </el-table-column>
      <el-table-column label="等级" align="center" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.Level|levelTxt}}</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐人" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row.Parent.ID)" v-if="scope.row.Parent">{{scope.row.Parent.Name}} - {{scope.row.Parent.LoginName}}</el-button>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐数量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.ChildrenCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260">
        <template slot-scope="scope">
          <div v-if="resetID!==scope.row.ID">
            <el-dropdown @command="handleCommand" trigger="click" :show-timeout="0">
              <el-button type="primary" size="mini">
                修改<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{item:scope.row,type:0}">基本信息</el-dropdown-item>
                <el-dropdown-item :command="{item:scope.row,type:1}">收款方式</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" size="mini" v-show="scope.row.Status==0" @click="handleFreeze(scope.row.ID)" v-role="['Administrators','Managers']">冻结</el-button>
            <el-button type="warning" size="mini" v-show="scope.row.Status==1" @click="handleUnfreeze(scope.row.ID)" v-role="['Administrators','Managers']">解冻</el-button>

            <el-button type="warning" size="mini" @click="resetID=scope.row.ID" v-role="['Administrators','Managers']">重置密码</el-button>
          </div>
          <div v-else>
            <el-button type="danger" size="mini" @click="handleReset(scope.row)">确定</el-button>
            <el-button type="" size="mini" @click="resetID=undefined">取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-size="listQuery.pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <memberdetail :id="detailID" :visible="detailVisiable" @update:visible="val => detailVisiable = val"></memberdetail>
    <memberform :member="member" :visible="formVisiable" @update:visible="val => formVisiable = val" @success="handleSuccess"></memberform>

    <accountform :member="member" :visible="wayFormVisible" @update:visible="val => wayFormVisible = val" @success="handleSuccess"></accountform>
    <rechargeform :visible="rechargeVisible" @update:visible="val => rechargeVisible = val" @success="handleSuccess" />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getList, resetPassword, setFreeze, setUnfreeze } from './api'
  import memberquery from '../controls/memberquery'
  import memberdetail from '../controls/memberdetail'
  import memberform from './form'
  import accountform from './accountform'
  import rechargeform from '../controls/rechargeform'

  export default {
    name: 'MemberList',
    components: {
      memberquery, memberdetail, memberform, accountform, rechargeform
    },
    data() {
      return {
        list: [],
        listQuery: {
          key: undefined,
          type: undefined,
          page: 1,
          pageSize: 10,
          level: undefined
        },
        total: 0,
        isLoading: false,

        detailID: undefined,
        detailVisiable: false,

        resetID: undefined,

        member: undefined,
        formVisiable: false,
        wayFormVisible: false,

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
      handleReset(item) {
        resetPassword(item.ID).then(res => {
          this.$message({
            center: true,
            showClose: true,
            message: '密码已成功重置',
            type: 'success'
          })
          this.resetID = undefined
        })
      },
      handleFreeze(id) {
        setFreeze(id).then(res => {
          this.fetchData()
          this.$message({
            center: true,
            showClose: true,
            message: '账户已成功冻结',
            type: 'success'
          })
          this.resetID = undefined
        })
      },
      handleUnfreeze(id) {
        setUnfreeze(id).then(res => {
          this.fetchData()
          this.$message({
            center: true,
            showClose: true,
            message: '账户已成功解冻',
            type: 'success'
          })
          this.resetID = undefined
        })
      },
      handleSuccess() {
        this.fetchData()
      },
      handleCommand(command) {
        if (command.type === 0) {
          this.handleEdit(command.item)
        } else if (command.type === 1) {
          this.handleWays(command.item)
        }
      },
      handleWays(item) {
        this.member = item
        this.wayFormVisible = true
      },
      handleEdit(item) {
        this.member = item
        this.formVisiable = true
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchData()
      },
      handleCreate() {
        this.member = undefined
        this.formVisiable = true
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    }
  }
</script>
