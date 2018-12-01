<template>
  <div>
    <el-dialog :title="isCreated?'添加会员':'修改会员'" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="resetData" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="100px" style=' margin:10px;'>
        <el-form-item label="登录名" prop="LoginName" v-if="isCreated">
          <el-input v-model="form.LoginName" placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="form.Name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="Phone">
          <el-input v-model="form.Phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="IDCard">
          <el-input v-model="form.IDCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="会员类型" prop="Type">
          <el-select v-model="form.Type" placeholder="会员类型">
            <el-option v-for="(item,index) in 4" :key="item" :label="index|memberTypeTxt" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="推荐人" v-if="isCreated">
          <memberquery v-model="form.Parent" class="filter-item" placeholder="推荐人" />
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
  import { validatIDCard } from '@/utils/validate'

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
          LoginName: undefined,
          Phone: undefined,
          IDCard: undefined,
          Type: 0,
          Parent: undefined
        },
        rules: {
          Name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          LoginName: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
          Phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
          Type: [{ required: true, message: '请选择会员类型', trigger: 'change' }],
          IDCard: [{ required: true, validator: validatIDCard, trigger: 'change' }]
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
      member: {
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
        if (this.member) {
          this.isCreated = false
          this.form.ID = this.member.ID
          this.form.LoginName = this.member.LoginName
          this.form.Name = this.member.Name
          this.form.Phone = this.member.Phone
          this.form.IDCard = this.member.IDCard
          this.form.Type = this.member.Type
        } else {
          this.isCreated = true
          this.form.ID = undefined
          this.form.LoginName = undefined
          this.form.Name = undefined
          this.form.Phone = undefined
          this.form.Type = undefined
          this.form.IDCard = undefined
          this.form.Parent = undefined
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
