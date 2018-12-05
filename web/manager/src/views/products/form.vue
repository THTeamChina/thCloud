<template>
  <div>
    <el-dialog :title="isCreated?'添加礼包':'修改礼包'" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="resetData" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="80px" style=' margin:10px;'>
        <el-form-item label="图片" prop="Thumbnail">
          <upload v-model="form.Thumbnail"></upload>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input v-model="form.Name" placeholder="请输入礼包名称"></el-input>
        </el-form-item>
        <el-form-item label="最低价格" prop="MinPrice">
          <el-input v-model="form.MinPrice" placeholder="请输入礼包最低价格"></el-input>
        </el-form-item>
        <el-form-item label="最高价格" prop="MaxPrice">
          <el-input v-model="form.MaxPrice" placeholder="请输入礼包最高价格"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="Content">
          <textarea placeholder="说明" maxlength="20" v-model="form.Content" class="el-textarea"></textarea>
          <!--<Editor prop="editorContent" v-model="form.Content"></Editor>-->
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
  import { post } from './api'
  import upload from '../controls/upload'
  import Editor from '@/components/editor'

  export default {
    name: 'productForm',
    components: {
      upload, Editor
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      product: {
        type: Object,
        default: undefined
      }
    },
    data() {
      return {
        form: {
          ID: undefined,
          Name: undefined,
          MinPrice: undefined,
          MaxPrice: undefined,
          Thumbnail: undefined,
          Content: undefined
        },
        rules: {
          Name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          Thumbnail: [{ required: true, message: '请选择图片', trigger: 'change' }],
          MinPrice: [{ required: true, message: '请输入礼包最低价格', trigger: 'blur' }],
          MaxPrice: [{ required: true, message: '请输入礼包最高价格', trigger: 'blur' }]
        },
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i),
        isCreated: false
      }
    },
    methods: {
      resetData() {
        if (this.product) {
          this.isCreated = false
          this.form.ID = this.product.ID
          this.form.Name = this.product.Name
          this.form.MinPrice = this.product.MinPrice
          this.form.MaxPrice = this.product.MaxPrice
          this.form.Thumbnail = this.product.Thumbnail
          this.form.Content = this.product.Content
        } else {
          this.isCreated = true
          this.form.ID = undefined
          this.form.Name = undefined
          this.form.MinPrice = undefined
          this.form.MaxPrice = undefined
          this.form.Thumbnail = undefined
          this.form.Content = undefined
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      submit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            post(this.form).then(response => {
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
<style>
  .el-dialog .el-dialog__footer {
    z-index: 10000
  }

  .el-textarea {
    display: inline-block;
    height: 90px;
    width: 100%;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
  }

</style>
