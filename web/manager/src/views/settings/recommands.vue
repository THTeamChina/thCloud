<template>
  <div class="block">
    <el-row v-if="items">
      <el-col :span="12" :xs="24" v-for="item in items" :key="item.Level">
        <div class="settingitem">
          <div>
            <span>直推:</span>
            <el-input v-model="item.Recommand" style="width:60px;" size="mini"></el-input>
            <span>人以上</span>
            <br />
            <span>加速奖励:</span>
            <el-input v-model="item.Proportion" style="width:60px;" size="mini"></el-input>
            <br />
            <el-button type="danger" @click="remove(item)" size="mini">删除</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin:10px;">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-row>
  </div>
</template>
<script>
  import { getRecommands, postRecommands } from './api'

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
        getRecommands().then(res => {
          this.items = res.data
          console.log(this.items)
        })
      },
      submit() {
        postRecommands(this.items).then(res => {
          this.$message({
            center: true,
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
        })
      },
      add() {
        this.items.push({ Recommand: 0, Proportion: 0 })
      },
      remove(item) {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
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
    height: 120px;
  }
</style>
