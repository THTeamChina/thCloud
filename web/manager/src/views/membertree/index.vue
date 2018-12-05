<template>
  <div class="app-container">
    <div class="filter-container">
      <memberquery v-model="mkey" class="filter-item" placeholder="推荐人"></memberquery>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="fetchData">过滤</el-button>
    </div>
    <div class="filter-container">
      <TreeChart :json="treeData"></TreeChart>
    </div>
  </div>

</template>

<script>
  import TreeChart from "../controls/treechart";
  import { getChildrens } from './api'
  import memberquery from '../controls/memberquery'

  export default {
    name: 'awesome-component',
    components: {
      TreeChart,
      memberquery
    },
    data() {
      return {
        treeData: {},
        mkey: undefined
      }
    },
    methods: {
      fetchData() {
        getChildrens(this.mkey).then(r => {
          this.treeData = r.data[0]
        })
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>
<style>
  .tree-block {
    float: left;
    width: 33%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px dotted #ccccdd;
    overflow: auto;
    height: 800px;
  }

  .treebtn1 {
    background-color: transparent;
    border: 1px solid #ccc;
    padding: 1px 3px;
    border-radius: 5px;
    margin-right: 5px;
    color: rgb(148, 147, 147);
  }

  .treebtn2 {
    background-color: transparent;
    border: 1px solid #ccc;
    padding: 3px 5px;
    border-radius: 5px;
    margin-left: 5px;
    color: rgb(97, 97, 97);
  }

  .treebtn3 {
    background-color: transparent;
    border: 1px solid #ccc;
    padding: 3px 5px;
    border-radius: 5px;
    margin-left: 5px;
    color: rgb(63, 63, 63);
  }

  .tree-search-input {
    width: 70%;
    padding: 6px 8px;
    outline: none;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .tree-search-btn {
    width: 25%;
    padding: 6px 8px;
    outline: none;
    border-radius: 6px;
    background-color: rgb(218, 218, 218);
    border: 1px solid rgb(226, 225, 225);
    color: rgb(117, 117, 117);
  }
</style>
