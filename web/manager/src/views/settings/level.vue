<template>
  <div class="block">
    <el-row v-if="items">
      <el-col :span="12" :xs="24" v-for="item in items" :key="item.Level">
        <div class="settingitem"  >
          <h2 style="margin:0;padding:0 0 20px">{{item.Level|levelTxt}}</h2>
          <div>
            <span>游戏币提成:</span>
            <el-input v-model="item.RobotProportion" style="width:60px;" size="mini"></el-input>
            <br />

            <span>充电积分提成:</span>
            <el-input v-model="item.PowerProportion" style="width:60px;" size="mini"></el-input>
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
  import { getLevels, postLevels } from './api'

  export default {
    name: 'levelbonus',
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
        getLevels().then(res => {
          this.items = res.data
          console.log(this.items)
        })
      },
      submit() {
        postLevels(this.items).then(res => {
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
