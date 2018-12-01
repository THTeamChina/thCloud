<template>
  <div>
    <el-dialog :title="'修改密码'" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="resetData" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <el-form ref="dataForm" :model="form" label-position="left" label-width="100px" style=' margin:10px;'>
        <el-form-item label="登录名">
          {{form.LoginName}}
        </el-form-item>
        <el-form-item label="原始密码" prop="Password">
          <el-input v-model="form.PassWord" :type="passwordType" :placeholder="$t('account.password')"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="NewPassword">
          <el-input v-model="form.NewPassWord" :type="passwordType" :placeholder="$t('account.newpassword')"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="ConfirmPassword">
          <el-input v-model="form.ConfirmPassword" :type="passwordType" :placeholder="$t('account.confirmpassword')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  import { getDashboard, postPassword } from '@/api/account'

  export default {
    name: 'EditPassword',
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
    data() {
      return {
        form: {
          ID: undefined,
          LoginName: undefined,
          Password: undefined,
          NewPassword: undefined,
          ConfirmPassword: undefined
        },
        passwordType: 'password',
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i)
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    methods: {
      resetData() {
        getDashboard().then(res => {
          this.dashboard = res.data
          this.form.ID = this.dashboard.ID
          this.form.LoginName = this.dashboard.LoginName
        })
      },
      submit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            postPassword(this.form).then(response => {
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
        })
      }
    }
  }
</script>
