<template>
  <div>
    <el-dialog title="修改" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="handleOpened" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <div v-if="items&&items.length">
        <el-carousel :interval="4000" type="card" height="170px" :autoplay="false" trigger="click" ref="carousel">
          <el-carousel-item v-for="item in items" :key="item.ID">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{item.Type}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="handleUpdate(item)">编辑</el-button>
              </div>
              <div class="text item">
                <label>姓名：</label>
                <span>{{item.Name}}</span>
              </div>
              <div class="text item">
                <label>账号：</label>
                <span>{{item.No}}</span>
              </div>
            </el-card>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px" style=' margin:10px;'>
        <el-form-item label="收款方式" prop="Type">
          <el-select v-model="formData.Type"
                     filterable
                     clearable
                     default-first-option
                     allow-create
                     placeholder="请选择或录入付款方式">
            <el-option v-for="item in ways"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="formData.Name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="No">
          <el-input v-model="formData.No" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{formData.ID?'保存':'立即创建'}}</el-button>
          <el-button @click="handleDelete(formData.ID)" type="danger" v-if="formData.ID">删除</el-button>
          <el-button @click="resetData">取消</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getList, postCreate, putEdit, delAccount } from '@/api/withdrawaccounts'

  export default {
    name: 'withdrawaccounts',
    data() {
      return {
        ways: [
          '支付宝',
          '微信',
          '建设银行',
          '中国银行',
          '中信银行',
          '工商银行',
          '邮政银行',
          '交通银行'
        ],
        items: [],
        formData: {
          MemberID: undefined,
          ID: undefined,
          Type: undefined,
          No: undefined,
          Name: undefined
        },
        rules: {
          Type: [{ required: true, message: '请选择收款方式', trigger: 'change' }],
          No: [{ required: true, message: '请输入收款账号', trigger: 'blur' }],
          Name: [{ required: true, message: '请收入姓名', trigger: 'blur' }]
        },
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i)
      }
    },
    props: {
      member: {
        type: Object
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      dialogVisible: {
        get() {
          return this.visible
        },
        set(newVal) {
          this.$emit('update:visible', newVal)
        }
      }
    },
    methods: {
      resetData() {
        this.formData.MemberID = this.member.ID
        this.formData.ID = undefined
        this.formData.Type = this.ways[0]
        this.formData.No = undefined
        this.formData.Name = undefined
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleOpened() {
        this.fetchData()
        this.resetData()
      },
      handleUpdate(item) {
        this.formData.ID = item.ID
        this.formData.Type = item.Type
        this.formData.No = item.No
        this.formData.Name = item.Name
      },
      handleDelete(id) {
        delAccount(id).then(response => {
          this.$message({
            center: true,
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.fetchData()
          this.resetData()
        }).catch(error => {
          this.$message({
            center: true,
            showClose: true,
            message: error.message,
            type: 'error'
          })
        })
      },
      fetchData() {
        this.items = []
        getList(this.member.ID).then(r => {
          this.items = r.data
          if (this.items.length) {
            this.$nextTick(() => {
              this.$refs['carousel'].setActiveItem(0)
            })
          }
        })
      },
      submit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.formData.ID) {
              putEdit(this.formData).then(response => {
                this.$message({
                  center: true,
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.fetchData()
                this.resetData()
              }).catch(error => {
                this.$message({
                  center: true,
                  showClose: true,
                  message: error.message,
                  type: 'error'
                })
              })
            } else {
              postCreate(this.formData).then(response => {
                this.$message({
                  center: true,
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.fetchData()
                this.resetData()
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
        })
      }
    }
  }
</script>
