<template>
  <div>
    <el-dialog title="每日分红设置" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="resetData" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="100px" style=' margin:10px;'>
        <p>当前共有分红点:{{FenHongDian.single+FenHongDian.double}},其中 单日数量:{{FenHongDian.single}} 双日数量{{FenHongDian.double}}</p>
        <el-form-item label="分红日期" prop="Date">
          <el-date-picker v-model="form.Date"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="金额" prop="Amount">
          <el-input v-model="form.Amount" placeholder="请输入分红数量"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit(false)">提交</el-button>
        <el-button type="primary" @click="submit(true)">提交并继续</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { postDaily, queryFenHongDian } from './api'

  export default {
    name: 'dailyform',
    data() {
      return {
        form: {
          Date: undefined,
          Amount: undefined
        },
        FenHongDian: {
          single: 0,
          double: 0
        },
        rules: {
          Date: [{ required: true, message: '请选择分红日期', trigger: 'change' }],
          Amount: [{ required: true, message: '请输入分红金额', trigger: 'blur' }]
        },
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i)
      }
    },
    props: {
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
    created() {
      queryFenHongDian().then(res => {
        this.FenHongDian = res.data
      })
    },
    methods: {
      resetData() {
        this.form.Date = undefined
        this.form.Amount = undefined

        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      submit(next) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            postDaily(this.form).then(response => {
              this.$message({
                center: true,
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              if (next) {
                this.form.Date = new Date(this.form.Date.getTime() + 24 * 60 * 60 * 1000)
                console.log(this.form.Date)
              } else {
                this.dialogVisible = false
              }
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
