<template>
  <div>
    <el-dialog :title="isCreated?'添加充电桩':'修改充电桩'" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="resetData" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="160px" style=' margin:10px;'>
        <el-form-item label="图片" prop="Photo">
          <upload v-model="form.Photo"></upload>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input v-model="form.Name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="Price">
          <el-input v-model="form.Price" placeholder="请输入价格"></el-input>
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
  import upload from '../controls/upload'

  export default {
    name: 'robotForm',
    components: {
      upload
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      power: {
        type: Object,
        default: undefined
      }
    },
    data() {
      return {
        form: {
          ID: undefined,
          Name: undefined,
          Price: undefined,
          Energy: 1
        },
        rules: {
          Name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          Price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
          Photo: [{ required: true, message: '请选择图片', trigger: 'blur' }]
        },
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i),
        isCreated: false
      }
    },
    methods: {
      resetData() {
        if (this.power) {
          this.isCreated = false
          this.form.ID = this.power.ID
          this.form.Name = this.power.Name
          this.form.Photo = this.power.Photo
          this.form.Price = this.power.Price
          this.form.Energy = this.power.Energy
        } else {
          this.isCreated = true
          this.form.ID = undefined
          this.form.Name = undefined
          this.form.Photo = undefined
          this.form.Price = undefined
          this.form.Energy = 1
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
    }
  }
</script>
