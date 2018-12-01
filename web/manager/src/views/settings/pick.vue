<template>
  <div class="block">
    <el-row v-if="items">
      <el-col :span="12" :xs="24" v-for="item in items" :key="item.Level">
        <div class="settingitem">
          <div>
            <span>当分红点数量在:</span>
            <el-input v-model="item.FenHongDian" style="width:60px;" size="mini"></el-input>
            <span>以上</span>
            <br />
            <span>杜仲:</span>
            <el-input v-model="item.DuZhong" style="width:60px;" size="mini"></el-input>
            <br />
            <span>分红:</span>
            <el-input v-model="item.FenHong" style="width:60px;" size="mini"></el-input>
            <br />
            <span>购物币:</span>
            <el-input v-model="item.GouWuBi" style="width:60px;" size="mini"></el-input>
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
  import { getPicks, postPicks } from './api'

  export default {
    name: 'picks',
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
        getPicks().then(res => {
          this.items = res.data
          console.log(this.items)
        })
      },
      submit() {
        postPicks(this.items).then(res => {
          this.$message({
            center: true,
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
        })
      },
      add() {
        this.items.push({ FenHongDian: 0, DuZhong: 0, FenHong: 0, GouWuBi: 0 })
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
    height: 180px;
  }
</style>
