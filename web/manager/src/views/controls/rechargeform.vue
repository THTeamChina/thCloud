<template>
  <div>
    <el-dialog title="充值" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="resetData" :close-on-press-escape="false" :close-on-click-modal="false" :fullscreen="equip">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="left" label-width="100px" style=' margin:10px;'>
        <el-form-item label="会员" prop="MemberKey">
          <memberquery v-model="form.MemberKey" class="filter-item" placeholder="会员" />
        </el-form-item>
        <el-form-item label="币种" prop="Type">
          <el-select v-model="form.Type" placeholder="请选择充值币种">
            <el-option v-for="(item,index) in 9" :key="item" :label="index|coinTypeTxt" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="Amount">
          <el-input v-model="form.Amount" placeholder="请输入充值金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { postRecharge } from '@/api/coins'
  import memberquery from './memberquery'

  export default {
    name: 'rechargeForm',
    components: {
      memberquery
    },
    data() {
      return {
        form: {
          Type: undefined,
          MemberKey: undefined,
          Amount: 100
        },
        rules: {
          Type: [{ required: true, message: '请输入币种', trigger: 'change' }],
          MemberKey: [{ required: true, message: '请选择充值会员', trigger: 'change' }],
          Amount: [{ required: true, message: '请输入充值金额', trigger: 'blur' }]
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
    methods: {
      resetData() {
        this.form.Type = undefined
        this.form.MemberKey = undefined
        this.form.Amount = undefined

        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      submit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            postRecharge(this.form).then(response => {
              this.$message({
                center: true,
                showClose: true,
                message: '充值成功',
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
