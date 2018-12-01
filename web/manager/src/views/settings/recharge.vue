<template>
  <div class="block">
    <el-row v-if="Settings">
      <el-col :span="12" :xs="24">
        <div class="settingitem">
          <h2 style="margin:0;padding:0 0 20px">微信</h2>
          <div style="width:200px;height:200px;margin:auto">
            <upload v-model="Settings.Wechat"></upload>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="settingitem">
          <h2 style="margin:0;padding:0 0 20px">支付宝</h2>
          <div style="width:200px;height:200px;margin:auto">
            <upload v-model="Settings.Alipay"></upload>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin:10px;">
      <el-button type="primary" @click="submit">保存</el-button>
    </el-row>
  </div>
</template>
<script>
  import { getRecharge, postRecharge } from './api'
  import upload from '../controls/upload'

  export default {
    name: 'recharge',
    components: {
      upload
    },
    data() {
      return {
        Settings: undefined
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getRecharge().then(res => {
          this.Settings = res.data
          console.log(this.Settings)
        })
      },
      submit() {
        postRecharge(this.Settings).then(res => {
          this.$message({
            center: true,
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
        })
      }
    }
  }
</script>

<style>
  .settingitem {
    padding: 20px;
    margin: 10px;
    background: white;
    border: solid 1px #eee;
    font-size: 14px;
    line-height: 30px;
    height: 260px;
  }
</style>
