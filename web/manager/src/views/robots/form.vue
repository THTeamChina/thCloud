<template>
  <div>
    <el-dialog :title="isCreated?'添加机器人':'修改机器人'" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="resetData" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="160px" style=' margin:10px;'>
        <el-form-item label="图片" prop="Photo">
          <upload v-model="form.Photo"></upload>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input v-model="form.Name" placeholder="请输入机器人名称"></el-input>
        </el-form-item>
        <el-form-item label="单位产出">
          <el-slider v-model="unitCount" range :min="1" :max="30" />
        </el-form-item>
        <el-form-item label="产出间隔">
          <el-slider v-model="form.Duration" show-stops :max="24" />
        </el-form-item>
        <el-form-item label="所需充电桩">
          <el-input-number v-model="form.PowerCount" :min="1" :max="100" label="所需充电桩数量"></el-input-number>
        </el-form-item>
        <el-form-item label="价格" prop="Price">
          <el-input v-model="form.Price" placeholder="请输入机器人价格"></el-input>
        </el-form-item>
        <el-form-item label="产量" prop="Output">
          <el-input v-model="form.Output" placeholder="请输入机器人产量"></el-input>
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
      robot: {
        type: Object,
        default: undefined
      }
    },
    data() {
      return {
        form: {
          ID: undefined,
          Name: undefined,
          Min: 10,
          Max: 20,
          Duration: 1,
          PowerCount: 1,
          Price: undefined,
          Output: undefined,
          Photo: undefined,
          Rank: 0
        },
        rules: {
          Name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          Min: [{ required: true, message: '请选择最小单位产出', trigger: 'blur' }],
          Max: [{ required: true, message: '请选择最大单位产出', trigger: 'blur' }],
          Duration: [{ required: true, message: '选择产出间隔', trigger: 'blur' }],
          PowerCount: [{ required: true, message: '请输入所需充电桩数量', trigger: 'blur' }],
          Price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
          Output: [{ required: true, message: '请输入总产量', trigger: 'blur' }],
          Photo: [{ required: true, message: '请选择图片', trigger: 'change' }]
        },
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i),
        isCreated: false
      }
    },
    methods: {
      resetData() {
        if (this.robot) {
          this.isCreated = false
          this.form.ID = this.robot.ID
          this.form.Name = this.robot.Name
          this.form.Min = this.robot.Min
          this.form.Max = this.robot.Max
          this.form.Duration = this.robot.Duration
          this.form.PowerCount = this.robot.PowerCount
          this.form.Price = this.robot.Price
          this.form.Output = this.robot.Output
          this.form.Photo = this.robot.Photo
          this.form.Rank = this.robot.Rank
        } else {
          this.isCreated = true
          this.form.ID = undefined
          this.form.Name = undefined
          this.form.Min = 3
          this.form.Max = 5
          this.form.Duration = 1
          this.form.PowerCount = 1
          this.form.Price = 100
          this.form.Output = 180
          this.form.Photo = undefined
          this.form.Rank = 0
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
      unitCount: {
        get: function () {
          return [this.form.Min, this.form.Max]
        },
        set: function (val) {
          if (val) {
            this.form.Min = val[0]
            this.form.Max = val[1]
          }
        }
      },
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
