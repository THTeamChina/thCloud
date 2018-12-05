<template>
  <div>
    <el-dialog :title="isCreated?'添加广告':'修改广告'" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="resetData" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="160px" style=' margin:10px;'>
        <el-form-item label="图片" prop="Thumbnail">
          <upload v-model="form.Thumbnail"></upload>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input v-model="form.Name" placeholder="请输入广告名称"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="Phone">
          <el-input v-model="form.Phone" placeholder="请输入电话"/>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input v-model="form.Remark" placeholder="请输入备注" />
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
    name: 'adForm',
    components: {
      upload
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      advertisement: {
        type: Object,
        default: undefined
      }
    },
    data() {
      return {
        form: {
          ID: undefined,
          Name: undefined,
          Thumbnail: undefined,
          Phone: undefined,
          Remark: undefined
        },
        rules: {
          Name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          Thumbnail: [{ required: true, message: '请选择图片', trigger: 'change' }]
        },
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i),
        isCreated: false
      }
    },
    methods: {
      resetData() {
        if (this.advertisement) {
          this.isCreated = false
          this.form.ID = this.advertisement.ID
          this.form.Name = this.advertisement.Name
          this.form.Phone = this.advertisement.Phone
          this.form.Thumbnail = this.advertisement.Thumbnail
          this.form.Remark = this.advertisement.Remark
        } else {
          this.isCreated = true
          this.form.ID = undefined
          this.form.Name = undefined
          this.form.Phone = undefined
          this.form.Thumbnail = undefined
          this.form.Remark = undefined
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
