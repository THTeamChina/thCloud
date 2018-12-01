<template>
  <div>
    <el-dialog :title="isCreate? '添加管理员' : '修改管理员'" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="resetData" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px" style=' margin:10px;'>


        <el-form-item label="登陆账号" prop="LoginName" v-if="isCreate">
          <el-input v-model="formData.LoginName" placeholder="请输入管理员登陆账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="formData.Password" placeholder="请输入管理员登陆密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名/昵称" prop="NickName">
          <el-input v-model="formData.NickName" placeholder="请输入管理员姓名/昵称"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="Role">
          <el-select class="filter-item" v-model="formData.Role" placeholder="请选择权限">
            <el-option :label="'Managers'|roleTxt" value="Managers" />
            <el-option :label="'Services'|roleTxt" value="Services" />
            <el-option :label="'Rechargors'|roleTxt" value="Rechargors" />
            <el-option :label="'Auditors'|roleTxt" value="Auditors" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">{{isCreate?'提交':'保存'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { postCreate, putEdit } from '@/api/account'
  import { validatUserName, validatPassword } from '@/utils/validate'

  export default {
    data() {
      return {
        isCreate: true,
        formData: {
          ID: undefined,
          LoginName: undefined,
          Password: undefined,
          NickName: undefined,
          Role: 'Managers',
          Enable: true
        },
        rules: {
          LoginName: [{ required: true, validator: validatUserName, trigger: 'blur' }],
          Password: [{ required: true, validator: validatPassword, trigger: 'blur' }],
          NickName: [{ required: true, message: '请输入管理员姓名/昵称', trigger: 'blur' }],
          Role: [{ required: true, message: '请选择管理员权限', trigger: 'change' }]
        },
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i)
      }
    },
    props: {
      account: {
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
        this.isCreate = this.account == null
        if (this.isCreate) {
          this.rules.Password[0].required = true
          this.formData.ID = undefined
          this.formData.LoginName = undefined
          this.formData.Password = undefined
          this.formData.NickName = undefined
          this.formData.Role = 'Managers'
        } else {
          this.rules.Password[0].required = false
          this.formData.ID = this.account.ID
          this.formData.Password = undefined
          this.formData.NickName = this.account.NickName
          this.formData.Role = this.account.Role
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      submit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.isCreate) {
              postCreate(this.formData).then(response => {
                this.$message({
                  center: true,
                  showClose: true,
                  message: '管理员创建成功',
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
              putEdit(this.formData).then(response => {
                this.$message({
                  center: true,
                  showClose: true,
                  message: '管理员修改成功',
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
