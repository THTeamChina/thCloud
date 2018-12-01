<template>
  <div class="block">
    <el-row v-if="Settings">
      <el-col :span="12" :xs="24">
        <div class="settingitem">
          <h2 style="margin:0;padding:0 0 20px">分红设置</h2>
          <div>
            <span>每满</span>
            <el-input v-model="Settings.FenHong.FenHong" style="width:80px;" size="mini"></el-input>
            <span>个分红<br />兑换</span>
            <el-input v-model="Settings.FenHong.FenHongDian" style="width:60px;" size="mini"></el-input>
            <span>个分红点</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="settingitem">
          <h2 style="margin:0;padding:0 0 20px">分红点设置</h2>
          <div>
            <span>每满</span>
            <el-input v-model="Settings.FengHongDian.Count" style="width:100px;" size="mini"></el-input>
            <span>扣除1个分红点</span>
            <span>默认分红数量</span>
            <el-input v-model="Settings.FengHongDian.DefaultAmount" style="width:100px;" size="mini"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="settingitem">
          <h2 style="margin:0;padding:0 0 20px">提现设置</h2>
          <div>
            <span>提现手续费</span>
            <el-input v-model="Settings.WithdrawSetting.Tax" style="width:120px;" size="mini"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="settingitem">
          <h2 style="margin:0;padding:0 0 20px">锁定杜仲</h2>
          <div>
            <span>每满</span>
            <el-input v-model="Settings.JiFenSetting.JiFen" style="width:120px;" size="mini"></el-input>
            <span>个锁定杜仲<br />兑换</span>
            <el-input v-model="Settings.JiFenSetting.Robot" style="width:120px;" size="mini"></el-input>
            <span>个机器人</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="settingitem">
          <h2 style="margin:0;padding:0 0 20px">领导奖</h2>
          <div>
            <span>获得直推加速数量的</span>
            <el-input v-model="Settings.Lead.Proportion" style="width:50px;" size="mini"></el-input>
            <span>的加速释放</span>
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
  import { getBase, postBase } from './api'

  export default {
    name: 'fenhong',
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
        getBase().then(res => {
          this.Settings = res.data
          console.log(this.Settings)
        })
      },
      submit() {
        postBase(this.Settings).then(res => {
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
    height: 200px;
  }
</style>
