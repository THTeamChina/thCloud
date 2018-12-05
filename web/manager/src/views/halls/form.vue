<template>
  <div>
    <el-dialog :title="isCreated?'创建交易大厅':'修改交易大厅'" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="resetData" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="100px" style=' margin:10px;'>

        <el-form-item label="名称" prop="Name">
          <el-input v-model="form.Name" placeholder="请输入大厅名称"></el-input>
        </el-form-item>
        <el-form-item label="所属人" prop="OwnerKey" v-if="isCreated">
          <memberquery v-model="form.OwnerKey" class="filter-item" placeholder="所属人" />
        </el-form-item>
        <el-form-item label="手续费" prop="Tax">
          <el-input v-model="form.Tax" placeholder="请输入手续费"></el-input>
        </el-form-item>
        <el-form-item label="交易量" prop="MinDeposit">
          <el-input v-model="form.MinDeposit" placeholder="请输入最小交易量（杜仲）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">{{isCreated?'提交':'保存'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { postCreate, putEdit } from './api'
  import memberquery from '../controls/memberquery'

  export default {
    name: 'HallsForm',
    components: {
      memberquery
    },
    data() {
      return {
        form: {
          ID: undefined,
          Name: undefined,
          OwnerKey: undefined,
          Tax: 0.1,
          MinDeposit: 100
        },
        rules: {
          Name: [{ required: true, message: '请输入大厅名称', trigger: 'blur' }],
          OwnerKey: [{ required: true, message: '请输入所属人', trigger: 'change' }],
          Tax: [{ required: true, message: '请输入交易手续费', trigger: 'blur' }],
          MinDeposit: [{ required: true, message: '请输入交易限额', trigger: 'blur' }]
        },
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i),
        isCreated: true
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      hall: {
        type: Object,
        default: undefined
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
        if (this.hall) {
          this.isCreated = false
          this.form.ID = this.hall.ID
          this.form.Name = this.hall.Name
          this.form.Tax = this.hall.Tax
          this.form.OwnerKey = this.hall.OwnerKey
          this.form.MinDeposit = this.hall.MinDeposit
        } else {
          this.isCreated = true
          this.form.ID = undefined
          this.form.Name = undefined
          this.form.OwnerKey = undefined
          this.form.Tax = 0.1
          this.form.MinDeposit = 100
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      submit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.isCreated) {
              postCreate(this.form).then(response => {
                this.$message({
                  center: true,
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                })
                this.dialogVisible = false
                this.$emit('success')
              }).catch(error => {
                this.$message({
                  center: true,
                  showClose: true,
                  message: error.message,
                  type: 'error'
                })
              })
            } else {
              putEdit(this.form).then(response => {
                this.$message({
                  center: true,
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.dialogVisible = false
                this.$emit('success')
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
