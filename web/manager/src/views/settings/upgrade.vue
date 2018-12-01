<template>
  <div class="block">
    <el-row v-if="items">
      <el-col :span="12" :xs="24" v-for="item in items" :key="item.Level">
        <div class="settingitem">
          <h2 style="margin:0;padding:0 0 20px">{{item.Level|levelTxt}}升级{{item.NextLevel|levelTxt}}</h2>
          <div>
            <span>所需业绩:</span>
            <el-input v-model="item.Amount" style="width:60px;" size="mini"></el-input>
            <br />
            <span>所需推荐人数:</span>
            <el-input v-model="item.RecommandCount" style="width:60px;" size="mini"></el-input>
            <br />
            <span>至少拥有:</span>
            <el-input v-model="item.MinLine" style="width:60px;" size="mini"></el-input>
            <span>条线</span>
            <br />
            <span>每条线上包含:</span>
            <el-input v-model="item.MemberCount" style="width:60px;" size="mini"></el-input>
            <span>个{{item.MemberLevel|levelTxt}}等级的会员</span>
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
  import { getUpgrades, postUpgrades } from './api'

  export default {
    name: 'upgrades',
    data() {
      return {
        items: undefined
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getUpgrades().then(res => {
          this.items = res.data
          console.log(this.items)
        })
      },
      submit() {
        postUpgrades(this.items).then(res => {
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
